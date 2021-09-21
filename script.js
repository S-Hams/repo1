(
    function () {
        const cartinfo = document.getElementById('cart-info') // the shopping cart button (its a div infact)
        const cart = document.getElementById('cart') // the shopping cart

        cartinfo.addEventListener('click', function () {
            cart.classList.toggle('show-cart')
        })
    }
)();

var addeditems = {} // esm va tedad e har item
var totalprice = 0; // kolle cost e basket e user

////adding items to the cart
(function () {

    ////selecting add-to cart button of items
    const cartBtn = document.querySelectorAll('.store-item-icon') // bcz we have more than one 

    cartBtn.forEach(function (btn) {
        const itemname2 = btn.parentElement.nextElementSibling.querySelector("#store-item-name").textContent
        addeditems[itemname2] = 0

        btn.addEventListener("click", function (e) {

            ////parent e marboot be span ee ke rush click shode ro mikhaim select konim
            var itemimg // itemimg ine : <div class="img-container">
            if (e.target.tagName == "SPAN") { //check if user clicked on span or i
                itemimg = e.target.parentElement
            } else { itemimg = e.target.parentElement.parentElement }

            ////inja mikhaim esme folder ro az avval e address bardarim va esme ye 
            ////folder dige ro bezarim ke bere thumbnail e un ax ro biare baramun

            imgaddress = itemimg.getElementsByTagName("img")[0].src //the img element
            imgindex = imgaddress.indexOf("img") + 3 //index of the end of img address
            img = imgaddress.slice(imgindex) // method e slice miad az un index be baad ro negah midare
            img2address = `img-cart${img}` //address e thumbnail az folder e img-cart

            ////sibling e parent e span ee ke rush click shode ro select mikonim ke esm va price e item ro az tush bekhunim
            var iteminfo = itemimg.nextElementSibling
            itemname = iteminfo.querySelector("#store-item-name").innerHTML

            itemprice = iteminfo.children[0].children[1].children[0].textContent

            addeditems[itemname] += 1
            //            alert(addeditems[itemname] + " " + itemname + " in your basket")

            const item = {
                img: img2address,
                name: itemname,
                price: itemprice * addeditems[itemname]
            }

            ////age addeditems[itemname] =1 hast element create beshe va ella ghablan create shode va faghat +1 beshe
            ////ezafe kardan e item e jadid be cart

            if (addeditems[itemname] == 1) {

                var itemcart = document.createElement("div")
                itemcart.id = `cart${itemname}`
                itemcart.innerHTML = `
            <!-- cart item -->
          <div class="cart-item d-flex justify-content-between text-capitalize my-3">
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text align-self-start">
<div class="d-flex">
              <p id="${item.name}" class="font-weight-bold mb-0">${item.name}  </p> <p id="itemnumber"></p>
     </div>         <span>$</span>
              <span id="item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
          
          </div>
          <!--end of  cart item -->
            `
                ////total cart ghemsat e payini e cart e, total price o ina
                const totalcart = cart.querySelector('.cart-total-container.d-flex.justify-content-around.text-capitalize.mt-5')
                cart.insertBefore(itemcart, totalcart)

                ////ezafe kardan e dokmeye delete 
                var dltbtn = document.createElement("a")
                dltbtn.id = 'cart-item-remove'
                dltbtn.href = '#'
                dltbtn.classList.add("cart-item-remove")
                dltbtn.innerHTML = '<i class="fas fa-trash"></i>'

                ////ziad, kam va hazf kardan e tedad e item ha too cart
                dltbtn.addEventListener('click', function () {

                    itemname = dltbtn.previousElementSibling.children[0].innerHTML
                    addeditems[itemname] -= 1
                    if (addeditems[itemname] == 0) {
                        itemcart.remove()
                    } else {
                        const updateprice = document.getElementById(`cart${itemname}`).querySelector('#item-price')
                        updateprice.innerHTML = itemprice * addeditems[itemname]
                    }

                    totalcost()
                })
                itemcart.children[0].appendChild(dltbtn)

            } else {
                ////namayesh majmoo e gheymat e har item too cart
                const updateprice = document.getElementById(`cart${itemname}`).querySelector('#item-price')
                updateprice.innerHTML = itemprice * addeditems[itemname]


                ////namayesh e tedad e har item tu cart
                const itemnumber = document.getElementById(itemname).nextElementSibling
                itemnumber.innerHTML = `\u00A0x\u00A0${addeditems[itemname]}`

            }


            totalcost()

        })
    })

})();

//// function for clear button // item ha ro az shopping cart pak mikonim
(
    function () {
        const clearcart = document.getElementById("clear-cart")
        const checkout = clearcart.nextElementSibling

        clearcart.addEventListener("click", () => {
            const items = [...cart.children] //mohtaviat e cart
            items.forEach(item => {
                if (item.id != "total") { //gheir az dokme haye clear va checkout kolle cart ro pak mikone
                    item.remove()
                }
            }
            );

            for (const i in addeditems) { //array e tedad e item ha ro pak mikonim
                addeditems[i] = 0
            }

            totalcost()

        })
    }

)()

//// function for updating total price and items in the cart
totalcost = () => {

    totalprice = 0

    const items = [...cart.children]
    items.forEach(item => { // price haye item haye tooye cart ro jam mizane
        if (item.id != "total") {
            const price = item.querySelector("#item-price").textContent
            totalprice += parseInt(price)

        }
    })

    //// total price e payin e cart
    const totalcost = document.getElementById("cart-total")
    totalcost.textContent = totalprice

    // dokmeye navbar ke tedad e kolle item ha va total price ro neshun mide
    const cartinfo = document.getElementById('cart-info')
    const carttotalprice = cartinfo.children[1].children[1]
    const carttotalitems = cartinfo.children[1].children[0]

    let totalitems = 00 // har bar avval tedad e item ha ro sefr mikonim va baad jam mizanim ba array e addeditems

    const values = Object.values(addeditems)

    values.forEach((value) =>
        totalitems += value
    )

    //dokmeye navbar e tedad va total price ro update mikonim
    carttotalprice.innerHTML = totalprice
    carttotalitems.innerHTML = totalitems


}

// filter buttons
(
    function () {
        const shopitems = document.querySelectorAll("[data-item]")
        const filterbtns = document.querySelectorAll("[data-filter]") // button haye filter ro migirim

        filterbtns.forEach(  //for each button check all shopitems
            (filterbtn) => {
                filterbtn.addEventListener('click',
                    () => {
                        //filter kardan ro ba method e filter ham bezanam ///////
                        shopitems.forEach(  //for each shop item check if it should be filtered or not
                            (shopitem) => {
                                shopitem.classList.remove("hide")
                                if (filterbtn.getAttribute("data-filter") !== "all") { //if the button is "all" do not filter

                                    if (filterbtn.getAttribute("data-filter") !== shopitem.getAttribute("data-item")) {
                                        shopitem.classList.add("hide")
                                    }

                                }
                            }
                        )
                    }
                )
            }
        )

        /// "div[id='doughnut']"


    }

)();




//search box

;
(
    function () {
        suggestionbox = document.createElement("div")
        const searchbox = document.getElementById('search-item')
        searchbox.addEventListener('input', (e) => {
            var suggestions = []
            const inputlength = e.target.value.length
            itemsname = document.querySelectorAll("#store-item-name")

            if (e.target.value !== "") {

                itemsname.forEach((itemname) => {

                    itemnameslice = itemname.innerHTML.slice(0, inputlength)

                    if (itemnameslice == e.target.value) {

                        suggestions.push(itemname.innerHTML)
                    }
                }
                )

            } else {
                var suggestions = []
            }

            suggestionbox.innerHTML = ""

            suggestions.forEach(
                (suggestion) => {
                    const suggestionelem = document.createElement("a")
                    suggestionelem.innerHTML = suggestion
                    suggestionelem.setAttribute('href', 'www.google.com')
                    suggestionelem.setAttribute('style', 'display : block')
                    suggestionbox.appendChild(suggestionelem)

                }
            )
            const form = document.querySelector('form')

            suggestionbox.setAttribute("class", "suggestionbox")
            //???? chera nemiad jolo???

            // chera be jaye searchbox be form appen kardim? chon searchbox flex hast va suggestionbox nemire payin, kenaresh gharar migire
            form.parentElement.appendChild(suggestionbox)

        })


    }


)()
