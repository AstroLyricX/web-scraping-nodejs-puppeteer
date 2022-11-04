const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto(
    "https://sp.booking.com/searchresults.es.html?aid=1697208&label=pe_latamtravel-booking_google_sem_perf_cyber_nnn_NNN-NNN_nnn_conversion_responsivo_20221024&sid=590bd65d0832c3ecf357b8faf9374af1&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fsp.booking.com%2Findex.es.html%3Faid%3D1697208%26label%3Dpe_latamtravel-booking_google_sem_perf_cyber_nnn_NNN-NNN_nnn_conversion_responsivo_20221024%26sid%3D590bd65d0832c3ecf357b8faf9374af1%26sb_price_type%3Dtotal%3Bsrpvid%3Dd1c871d64a6f01d2%26%26&ss=Cuzco%2C+Per%C3%BA&is_ski_area=&checkin_year=&checkin_month=&checkout_year=&checkout_month=&efdco=1&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&dest_id=-345275&dest_type=city&search_pageview_id=bf327c1fbada0314&search_selected=true",
    {
      waitUntil: "networkidle2",
    }
  );


  const hotelLinks = await page.evaluate(() => {
    const elements = document.querySelectorAll(".a4225678b2 a");

    const links = [];

    for (let element of elements) {
      links.push(element.href);
    }

    return links;
  });


  const hoteles = [];

  for ( let hotelLink of hotelLinks ) {
    await page.goto(hotelLink);
    await page.waitForTimeout(1000);
    // await page.waitForSelector('.d2fee87262 pp-header__title');

    
    const hotel = await page.evaluate(() => {

      const tmp = {};

      tmp.title = document.querySelector('.pp-header__title').innerText;
      tmp.adress = document.querySelector('#showMap2 >  span').innerText;
      tmp.fifeedback = document.querySelector('.d10a6220b4').innerText;
      tmp.numberComments = document.querySelector('.db63693c62').innerText;

      return tmp;
    });

    hoteles.push(hotel);
  }



  console.log(hoteles);

  // await browser.close();
})();
