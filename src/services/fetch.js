
const url = "https://d4ee5144-8771-4114-965b-a9fb57da56ee.mock.pstmn.io";
//const url = "localhost:8080";

const MyFetch = (uri, method, payload = {}, extUrl = null, header = {}) => {

    let uuu = extUrl ? extUrl + uri : url + uri;
    return new Promise((resolve, reject) => {
        fetch(extUrl ? extUrl + uri : url + uri, {
            method,
            headers: {
                ...{'Content-Type': 'application/json'}, ...header},
            body: JSON.stringify(payload)
        }).then(result => {
            resolve(result)
        }).catch(error => {
            reject(error);
        })
    })

}

// ulas.eraslan@hotmail.com

export default MyFetch;
