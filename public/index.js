const fetchSysInfo = () => {
    fetch('/info', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => {
        document.querySelector('#CPU-NAME').innerText = data.cpus[0].model
        document.querySelector('#MEM-USAGE').innerText = (((data.tmem - data.fmem) / data.tmem) * 100).toFixed(2) + "%"
        document.querySelector('#MEM-INFO').innerText = ((data.tmem - data.fmem) / (1000000000.0)).toFixed(2) + " GB / " + (data.tmem / (1000000000.0)).toFixed(2) + " GB"
        const days = Math.floor((data.uptime) / 86400); 
        const hours = Math.floor(((data.uptime) % 86400) / 3600);
        const minutes = Math.floor((((data.uptime) % 86400) % 3600) / 60);
        const seconds = Math.floor((((data.uptime) % 86400) % 3600) % 60);
        document.querySelector('#UPTIME').innerText = data.uptime = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
    })
}

const getSys = setInterval(fetchSysInfo, 1000)