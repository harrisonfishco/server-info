const fetchSysInfo = () => {
    fetch('/info', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => {
        if(document.querySelector('#CPU-NAME').innerText == "CPU")
            document.querySelector('#CPU-NAME').innerText = data.cpus[0].model
        document.querySelector('#MEM-USAGE').innerText = (((data.tmem - data.fmem) / data.tmem) * 100).toFixed(2) + "%"
        document.querySelector('#MEM-INFO').innerText = ((data.tmem - data.fmem) / (1000000000.0)).toFixed(2) + " GB / " + (data.tmem / (1000000000.0)).toFixed(2) + " GB"
        const days = Math.floor((data.uptime) / 86400); 
        const hours = Math.floor(((data.uptime) % 86400) / 3600);
        const minutes = Math.floor((((data.uptime) % 86400) % 3600) / 60);
        const seconds = Math.floor((((data.uptime) % 86400) % 3600) % 60);
        document.querySelector('#UPTIME').innerText = data.uptime = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`

        const canvas = document.querySelector('#MEMGRAPH')
        const ctx = canvas.getContext('2d')

        const bb = canvas.getBoundingClientRect()
        const width = canvas.width
        const height = canvas.height

        ctx.clearRect(0, 0, width, height)

        // for(var i = 0; i < 10; ++i) {
        //     ctx.beginPath()
        //     console.log((i * (width / 10)) + (width / 10))
        //     ctx.moveTo((i * (width / 10)) + (width / 10), 0)
        //     ctx.lineTo((i * (width / 10)) + (width / 10), height)
        //     ctx.stroke()
        // }
        data.gd.reverse()
        for(var i = 0, j = 0; i < width; i += width / 10) {
            ctx.beginPath()
            ctx.moveTo(i, height * (1 - data.gd[j]))
            ctx.lineTo(i + (width / 10), height * (1 - data.gd[j + 1]))
            ctx.stroke()
            ++j
        }
    })
}

const getSys = setInterval(fetchSysInfo, 1000)