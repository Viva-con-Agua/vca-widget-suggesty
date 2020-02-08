function ajaxx (type, route, data) {

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open(type, route)
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log(xhr.responseText);
        resolve(JSON.parse(xhr.responseText))
      } else {
        Promise.reject(new Error('Something went wrong'))
      }
    }
    xhr.onerror = function () {
      Promise.reject(new Error('Something went wrong'))
    }
    xhr.setRequestHeader('Authorization', '1')
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(data))
  })


}

export {ajaxx}