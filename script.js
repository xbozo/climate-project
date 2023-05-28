document.querySelector(".busca").addEventListener("submit", async (event) => {    // evita o form de ser enviado, recarregando a pagina
    event.preventDefault()

    let input = document.querySelector("#searchInput").value

    if(input !== "") {
        showWarning("Carregando...")

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d5231c10f03084b57edfa9769ed0ddff&units=metric`
        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {             // encontrado
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,          // [0] = dentro do primeiro array 
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning("Não encontramos esta localização.")
        }
    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showWarning("")

    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`        // json.name se refere ao parâmetro da função
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle-90}deg)`       // -90 por conta do HTML ser criado com o ponto inicial em 90deg

    document.querySelector(".resultado").style.display = "block"
}

function clearInfo() {
    showWarning("")
    document.querySelector(".resultado").style.display = "none"
}

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg
}