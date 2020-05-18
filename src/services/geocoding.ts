declare var H: any;
const platform = new H.service.Platform({
    'apikey': 'zAp7nKEIvqFJVO4ND7fUUwOZANfZKa9TBL-lje-jrG4'
  });
// Get an instance of the search service:
var service = platform.getSearchService();
  
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                service.reverseGeocode({
                    at: `${latitude},${longitude}`
                  }, (result: { items: any[]; }) => {
                    resolve(result.items[0]?.address.state);
                  }, (error: Error) => {
                      reject("Geolocation service error");
                      console.error(error);
                  });
            }, (error: PositionError) => {
                reject("Navigator geolocation  error");
                console.error(error);
            }, {
                enableHighAccuracy: true,
                maximumAge: 20000
            });
        } else {
            reject("unsupported browser");
        }
    });
};