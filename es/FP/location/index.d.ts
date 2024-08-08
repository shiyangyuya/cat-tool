/**
 * 在https环境下获取经纬度信息
 * @param timeout 超时时间;默认不超时
 * @returns Promise<{ latitude: number; longitude: number }>
 */
declare const getLocaltion: (timeout?: number) => Promise<{
    latitude: number;
    longitude: number;
}>;
export default getLocaltion;
