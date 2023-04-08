

const subscribers = {};


{
    callPesho: [
        () => null
    ]
}

//subscribe is also known as addEventListener
exports.subscribe = (eventType, callback) => {
    if(!subscribers[eventType]) {
        subscribers[eventType] = []
    }
    subscribers[eventType].push(callback)


    //to unsubscribe a function (calback)
    return () => {                      
        subscribers[eventType] = subscribers[eventType].filter(x => x!= callback)
    }
}
// publish s also known as emit or trigger
exports.publish = (eventType, ...params) => {
    subscribers[eventType].forEach(x => x(...params));    // for each element we want to call it
}

