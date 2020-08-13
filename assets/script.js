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
        
        //calculate FIFO
        calculateFIFO(FIFO, [...trackValue])

        //calculate SSTF
        calculateSSTF(SSTF, [...Track.value.split(' ')], Head.value)
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

const calculateSSTF = (id, domSequence, domHead) => {
    arr = domSequence
    start = parseInt(domHead)

    console.log(arr, start)

    if (arr.length === 0) {
        alert("sequence kosong!")
    } else {
        var nodeDistance = new Array(arr.length)
        var nodeAccessed = new Array(arr.length)

        var i = 0
        for (i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i])
            nodeDistance[i] = 0
            nodeAccessed[i] = false
        }

        var seek_count = 0
        var seek_sequence = new Array(arr.length+1)

        for (i = 0; i < arr.length ; i++) {
            seek_sequence[i] = start

            // Calculates difference of each
            // track number with the head position
            var j = 0
            for(j = 0; j < arr.length; j++){
                nodeDistance[j] = Math.abs(arr[j] - start)
            }

            // find unaccessed track
            // which is at minimum distance from head
            var index = -1
            var minimum = Number.MAX_VALUE;

            for (j = 0; j < arr.length; j++) {
                if (!nodeAccessed[j] && minimum > nodeDistance[j]) {
                    minimum = nodeDistance[j];
                    index = j;
                }
            }

            nodeAccessed[index] = true

            // increase the total count
            seek_count += nodeDistance[index]

            //accessed track is now new head
            start = arr[index]
        }

        // for last accessed track
        seek_sequence[seek_sequence.length - 1] = start;

        const SSTFTimeDeviation = timeDeviation(seek_sequence)

        setChart(
            id,
            seek_sequence,
            SSTFTimeDeviation['timeDeviationString'],
            'SSTF'
        )
    }
}

const calculateSCAN = () => {
    
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