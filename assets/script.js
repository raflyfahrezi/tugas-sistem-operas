const getElementById = (id) => {
    return document.getElementById(id)
}

self.addEventListener('DOMContentLoaded', () => {
    // input
    const Track = getElementById('track')
    const Head = getElementById('head')

    // canvas
    const FIFO = getElementById('FIFO')
    const SSTF = getElementById('SSTF')
    const SCAN = getElementById('SCAN')
    const CSCAN = getElementById('CSCAN')

    //when button calculate clicked
    getElementById('calc').addEventListener('click', () => {
        //add head to track
        let trackValue = Track.value.split(' ')
        trackValue.unshift(Head.value)
        
        //calculateFIFO
        calculateFIFO(FIFO, [...trackValue])
    })
})

const setChart = (id, track, time, title)  => {
    const myChart = new Chart(id, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Track ke ',
                data: track,
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
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

const calculateFIFO = (id, track) => {
    const FIFOTimeDeviation = timeDeviation(track)

    setChart(
        id,
        track,
        FIFOTimeDeviation['timeDeviationString'],
        'FIFO'
    )
}

const timeDeviation = track => {
    const timeDeviationString = []
    const timeDeviationNumber = []

    for (let i = 0; i < track.length - 1; i++) {
        timeDeviationString.push("+-" + Math.abs(track[i] - track[i+1]))
        timeDeviationNumber.push(Math.abs(track[i] - track[i+1]))
    }

    timeDeviationString.unshift(' ')

    return {
        'timeDeviationString' : timeDeviationString,
        'timeDeviationNumber' : timeDeviationNumber
    }
}