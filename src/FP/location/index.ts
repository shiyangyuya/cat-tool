/**
 * 在https环境下获取经纬度信息
 * @param timeout 超时时间;默认不超时
 * @returns Promise<{ latitude: number; longitude: number }>
 */
const getLocaltion = (
  timeout?: number
): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    const config =
      timeout === void 0
        ? { enableHighAccuracy: true }
        : { enableHighAccuracy: true, timeout };
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => reject(error),
      config
    );
  });
};

export default getLocaltion;
