import {ApisauceInstance, create, ApiResponse} from 'apisauce';
import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';
import {getGeneralApiProblem} from './api-problem';
import {ApiConfig, DEFAULT_API_CONFIG} from './api-config';
import * as Types from './api.types';

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });

    this.attachInterceptors();
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get('/users');

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      };
    };

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data;
      const resultUsers: Types.User[] = rawUsers.map(convertUser);
      return {kind: 'ok', users: resultUsers};
    } catch {
      return {kind: 'bad-data'};
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      };
      return {kind: 'ok', user: resultUser};
    } catch {
      return {kind: 'bad-data'};
    }
  }

  private attachInterceptors() {
    this.apisauce.axiosInstance.interceptors.request.use(async config => {
      try {
        const httpMetric = perf().newHttpMetric(
          config.url,
          config.method as FirebasePerformanceTypes.HttpMethod,
        );

        Object.assign(config, {metadata: httpMetric});

        // add any extra metric attributes, if required
        // httpMetric.putAttribute('userId', '12345678');

        await httpMetric.start();
      } finally {
        // noinspection ReturnInsideFinallyBlockJS
        return config;
      }
    });

    this.apisauce.axiosInstance.interceptors.response.use(
      async response => {
        try {
          // Request was successful, e.g. HTTP code 200

          // @ts-ignore
          const {httpMetric} = response.config.metadata;

          // add any extra metric attributes if needed
          // httpMetric.putAttribute('userId', '12345678');

          httpMetric.setHttpResponseCode(response.status);
          httpMetric.setResponseContentType(response.headers['content-type']);
          await httpMetric.stop();
        } finally {
          // noinspection ReturnInsideFinallyBlockJS
          return response;
        }
      },
      async error => {
        try {
          // Request failed, e.g. HTTP code 500

          const {httpMetric} = error.config.metadata;

          // add any extra metric attributes if needed
          // httpMetric.putAttribute('userId', '12345678');

          httpMetric.setHttpResponseCode(error.response.status);
          httpMetric.setResponseContentType(
            error.response.headers['content-type'],
          );
          await httpMetric.stop();
        } finally {
          // Ensure failed requests throw after interception
          // noinspection ReturnInsideFinallyBlockJS
          return Promise.reject(error);
        }
      },
    );
  }
}
