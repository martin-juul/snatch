/* eslint-disable */
import React, { Component } from "react"
import { Polyline } from "react-native-maps"
import { isEqual } from "lodash-es"
import { MapViewDirectionsProps, MapViewDirectionsState } from "./types"

const WAYPOINT_LIMIT = 10

const promiseMemoize = (fn, resolver) => {
  const cache = {}
  return (...args) => {
    const strX = JSON.stringify(args)
    const trySetResultsToCache = () => {
      return (cache[strX] = fn(...args).catch((x) => {
        delete cache[strX]
        return Promise.reject(x)
      }))
    }

    if (strX in cache) {
      return Promise.resolve(cache[strX]).then(cachedResult => {
        if (resolver && !resolver({ cachedResult, providedArgs: args[0] })) {
          return trySetResultsToCache()
        }
        return cachedResult
      })
    } else {
      return trySetResultsToCache()
    }
  }
}


export class MapViewDirections extends Component<MapViewDirectionsProps, MapViewDirectionsState> {

  constructor(props) {
    super(props)

    this.state = {
      coordinates: null,
      distance: null,
      duration: null,
    }
  }

  componentDidMount() {
    this.fetchAndRenderRoute(this.props)
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.origin, this.props.origin)
      || !isEqual(prevProps.destination, this.props.destination)
      || !isEqual(prevProps.waypoints, this.props.waypoints)
      || !isEqual(prevProps.mode, this.props.mode)
      || !isEqual(prevProps.precision, this.props.precision)
      || !isEqual(prevProps.splitWaypoints, this.props.splitWaypoints)
    ) {
      if (this.props.resetOnChange === false) {
        this.fetchAndRenderRoute(this.props)
      } else {
        this.resetState(() => {
          this.fetchAndRenderRoute(this.props)
        })
      }
    }
  }

  resetState = (cb = null) => {
    this.setState({
      coordinates: null,
      distance: null,
      duration: null,
    }, cb)
  }

  decode(t) {
    const points = []
    for (const step of t) {
      const encoded = step.polyline.points
      let index = 0
      const len = encoded.length
      let lat = 0
      let lng = 0
      while (index < len) {
        let b
        let shift = 0
        let result = 0
        do {
          b = encoded.charAt(index++).charCodeAt(0) - 63
          result |= (b & 0x1f) << shift
          shift += 5
        } while (b >= 0x20)

        const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
        lat += dlat
        shift = 0
        result = 0
        do {
          b = encoded.charAt(index++).charCodeAt(0) - 63
          result |= (b & 0x1f) << shift
          shift += 5
        } while (b >= 0x20)
        const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
        lng += dlng

        points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) })
      }
    }
    return points
  }

  fetchAndRenderRoute = (props: Readonly<MapViewDirectionsProps> & Readonly<{ children?: React.ReactNode }>) => {

    const {
      origin: initialOrigin,
      destination: initialDestination,
      waypoints: initialWaypoints = [],
      apikey,
      onStart,
      onReady,
      onError,
      mode = "DRIVING",
      language = "en",
      optimizeWaypoints,
      splitWaypoints,
      directionsServiceBaseUrl = "https://maps.googleapis.com/maps/api/directions/json",
      region,
      precision = "low",
      timePrecision = "none",
      channel,
    } = props

    if (!apikey) {
      console.warn(`MapViewDirections Error: Missing API Key`) // eslint-disable-line no-console
      return
    }

    if (!initialOrigin || !initialDestination) {
      return
    }

    const timePrecisionString = timePrecision === "none" ? "" : timePrecision

    // Routes array which we'll be filling.
    // We'll perform a Directions API Request for reach route
    const routes = []

    // We need to split the waypoints in chunks, in order to not exceed the max waypoint limit
    // ~> Chunk up the waypoints, yielding multiple routes
    if (splitWaypoints && initialWaypoints && initialWaypoints.length > WAYPOINT_LIMIT) {
      // Split up waypoints in chunks with chunk size WAYPOINT_LIMIT
      const chunkedWaypoints = initialWaypoints.reduce((accumulator, waypoint, index) => {
        const numChunk = Math.floor(index / WAYPOINT_LIMIT)
        accumulator[numChunk] = [].concat((accumulator[numChunk] || []), waypoint)
        return accumulator
      }, [])

      // Create routes for each chunk, using:
      // - Endpoints of previous chunks as startpoints for the route (except for the first chunk, which uses initialOrigin)
      // - Startpoints of next chunks as endpoints for the route (except for the last chunk, which uses initialDestination)
      for (let i = 0; i < chunkedWaypoints.length; i++) {
        routes.push({
          waypoints: chunkedWaypoints[i],
          origin: (i === 0) ? initialOrigin : chunkedWaypoints[i - 1][chunkedWaypoints[i - 1].length - 1],
          destination: (i === chunkedWaypoints.length - 1) ? initialDestination : chunkedWaypoints[i + 1][0],
        })
      }
    }

      // No splitting of the waypoints is requested/needed.
    // ~> Use one single route
    else {
      routes.push({
        waypoints: initialWaypoints,
        origin: initialOrigin,
        destination: initialDestination,
      })
    }

    // Perform a Directions API Request for each route
    Promise.all(routes.map((route, index) => {
      let {
        origin,
        destination,
        waypoints,
      } = route

      if (origin.latitude && origin.longitude) {
        origin = `${origin.latitude},${origin.longitude}`
      }

      if (destination.latitude && destination.longitude) {
        destination = `${destination.latitude},${destination.longitude}`
      }

      waypoints = waypoints
        .map(waypoint => (waypoint.latitude && waypoint.longitude) ? `${waypoint.latitude},${waypoint.longitude}` : waypoint)
        .join("|")

      if (optimizeWaypoints) {
        waypoints = `optimize:true|${waypoints}`
      }

      if (index === 0) {
        onStart && onStart({
          origin,
          destination,
          waypoints: initialWaypoints,
        })
      }

      return (
        this.fetchRoute({
          directionsServiceBaseUrl,
          origin,
          waypoints,
          destination,
          apikey,
          mode,
          language,
          region,
          precision,
          timePrecision: timePrecisionString,
          channel,
        })
          .then(result => {
            return result
          })
          .catch(errorMessage => {
            return Promise.reject(errorMessage)
          })
      )
    })).then(results => {
      // Combine all Directions API Request results into one
      const result = results.reduce((accumulator, { distance, duration, coordinates, fare, waypointOrder }) => {
        accumulator.coordinates = [
          ...accumulator.coordinates,
          ...coordinates,
        ]
        accumulator.distance += distance
        accumulator.duration += duration
        accumulator.fares = [
          ...accumulator.fares,
          fare,
        ]
        accumulator.waypointOrder = [
          ...accumulator.waypointOrder,
          waypointOrder,
        ]

        return accumulator
      }, {
        coordinates: [],
        distance: 0,
        duration: 0,
        fares: [],
        waypointOrder: [],
      })

      // Plot it out and call the onReady callback
      this.setState({
        coordinates: result.coordinates,
      }, function() {
        if (onReady) {
          onReady(result)
        }
      })
    })
      .catch(errorMessage => {
        this.resetState()
        console.warn(`MapViewDirections Error: ${errorMessage}`) // eslint-disable-line no-console
        onError && onError(errorMessage)
      })
  }

  fetchRoute = promiseMemoize(({
                                 directionsServiceBaseUrl,
                                 origin,
                                 waypoints,
                                 destination,
                                 apikey,
                                 mode,
                                 language,
                                 region,
                                 precision,
                                 timePrecision,
                                 channel,
                               }) => {
    // Define the URL to call. Only add default parameters to the URL if it's a string.
    let url = directionsServiceBaseUrl
    if (typeof (directionsServiceBaseUrl) === "string") {
      url += `?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${apikey}&mode=${mode.toLowerCase()}&language=${language}&region=${region}`
      if (timePrecision) {
        url += `&departure_time=${timePrecision}`
      }
      if (channel) {
        url += `&channel=${channel}`
      }
    }

    return fetch(url, {
      headers: {
        "User-Agent": "snatch",
      },
    })
      .then(response => response.json())
      .then(json => {

        if (json.status !== "OK") {
          const errorMessage = json.error_message || json.status || "Unknown error"
          return Promise.reject(errorMessage)
        }

        if (json.routes.length) {
          const route = json.routes[0]

          return Promise.resolve({
            distance: route.legs.reduce((carry, curr) => {
              return carry + curr.distance.value
            }, 0) / 1000,
            duration: route.legs.reduce((carry, curr) => {
              return carry + (curr.duration_in_traffic ? curr.duration_in_traffic.value : curr.duration.value)
            }, 0) / 60,
            coordinates: (
              (precision === "low") ?
                this.decode([{ polyline: route.overview_polyline }]) :
                route.legs.reduce((carry, curr) => {
                  return [
                    ...carry,
                    ...this.decode(curr.steps),
                  ]
                }, [])
            ),
            fare: route.fare,
            waypointOrder: route.waypoint_order,
          })

        } else {
          throw new Error("Did not get any routes")
        }
      })
      .catch(e => {
        console.error(e)
        throw e
      })
  }, ({ cachedResult, providedArgs }) => {
    const { isMemoized } = this.props

    if (typeof isMemoized === "boolean") {
      return isMemoized
    }

    if (!isMemoized || (typeof isMemoized !== "function")) {
      return false
    }

    try {
      return isMemoized({ cachedResult, ...providedArgs })
    } catch {
      return false
    }
  })

  render() {
    const { coordinates } = this.state

    if (!coordinates) {
      return null
    }

    const {
      origin,
      waypoints,
      splitWaypoints,
      destination,
      apikey,
      onReady,
      onError,
      mode,
      language,
      region,
      precision,
      ...props
    } = this.props

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Polyline coordinates={coordinates} {...props} />
  }

}
