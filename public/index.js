setTimeout(() => {
    fetch("./scripts.json").then(res => res.json()
        .then(json => {
            const loader = document.querySelector("#loader")
            loader.remove()

            const onButtonClick = id => {
                fetch(`/buy&script=${id}`, {
                    "method": "POST"
                }).then(res => {
                    console.log(res.status)
                })
            }

            json.forEach(script => {
                const card = document.createElement("div")
                card.classList.add("row")

                card.innerHTML = `<div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${script.name} - ${script.price} BTC</span>
                            <p>${script.description}</p>
                        </div>
                        <div class="card-action">
                            <a class="buy" data-script="${script.id}">Buy</a>
                        </div>
                    </div>
                </div>`

                document.body.appendChild(card)
            })

            document.querySelectorAll(".buy").forEach(elem => {
                elem.dataset.script && elem.addEventListener("click", () =>
                    onButtonClick(elem.dataset.script))
            })
    }))
}, 1000)