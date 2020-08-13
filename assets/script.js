const getElementById = (id) => {
    return document.getElementById(id)
}

self.addEventListener('DOMContentLoaded', () => {
    const FIFO = getElementById('FIFO')
    const SSTF = getElementById('SSTF')
    const SCAN = getElementById('SCAN')
    const CSCAN = getElementById('CSCAN')

})

const setChart = (id, track, time, title)  => {
    const myChart = new Chart(id, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'of Votes',
                data: track,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: title,
                fontSize: 20
            },
            legend: {
                display: false
            }
        }
    })
}

const FIFO = track => {

}