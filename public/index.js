fetch('/info', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json()).then(data => {
    console.log(data.mem)
    document.querySelector('#CPU-NAME').innerText = data.cpus[0].model
    document.querySelector('#MEM-USAGE').innerText = (((data.tmem - data.fmem) / data.tmem) * 100).toFixed(2) + "%"
    document.querySelector('#MEM-INFO').innerText = ((data.tmem - data.fmem) / (1000000000.0)).toFixed(2) + " GB / " + (data.tmem / (1000000000.0)).toFixed(2) + " GB"
})