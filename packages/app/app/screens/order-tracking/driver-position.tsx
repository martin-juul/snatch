import React, { useEffect, useState } from "react"
import { Region } from "react-native-maps"

type Props = {
  position: Region
}

export function DriverPosition({ position }: Props) {
  const [region, setRegion] = useState(position)
  const [prevRegion, setPrevRegion] = useState<Region>()

  useEffect(() => {
    if (position.latitude !== region.latitude || position.longitude !== region.latitude) {
      setPrevRegion(region)
      setRegion(position)
    }
  }, [position])
}
