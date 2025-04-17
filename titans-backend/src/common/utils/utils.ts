/* eslint-disable prettier/prettier */

export class Utils {
    static publicResponse<T = any, U = any>(data: T): U {
      const transformedData = data; 
  
      return {
        success: true,
        message: 'Operation was successful',
        data: transformedData,
      } as unknown as U;
    }
  }
  
  