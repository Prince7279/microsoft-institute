function testimonialSlider() {
    let e = document.getElementById("carouselOne");
    e &&
        e.addEventListener("slid.bs.carousel", function () {
            let e = this.querySelector(".active");
            document.querySelector(".js-testimonial-img").src = e.getAttribute("data-js-testimonial-img");
        });
}
function coursePreviewVideo() {
    let e = document.querySelector(".js-course-preview-modal");
    e &&
        (e.addEventListener("shown.bs.modal", function () {
            this.querySelector(".js-course-preview-video").play(), (this.querySelector(".js-course-preview-video").currentTime = 0);
        }),
        e.addEventListener("hide.bs.modal", function () {
            this.querySelector(".js-course-preview-video").pause();
        }));
}
function headerMenu() {
    let e = document.querySelector(".js-header-menu");
    function t() {
        e.classList.toggle("open"), backdrop.classList.toggle("active"), document.body.classList.toggle("overflow-hidden");
    }
    function s() {
        e.querySelector(".active .js-sub-menu").removeAttribute("style"), e.querySelector(".active").classList.remove("active");
    }
    (backdrop = document.querySelector(".js-header-backdrop")),
        (menuCollaspeBreakpoint = 991),
        document.querySelectorAll(".js-header-menu-toggler").forEach((e) => {
            e.addEventListener("click", t);
        }),
        backdrop.addEventListener("click", t),
        e.addEventListener("click", (t) => {
            let { target: i } = t;
            if (i.classList.contains("js-toggle-sub-menu") && window.innerWidth <= menuCollaspeBreakpoint) {
                if ((t.preventDefault(), i.parentElement.classList.contains("active"))) {
                    s();
                    return;
                }
                e.querySelector(".active") && s(), i.parentElement.classList.add("active"), (i.nextElementSibling.style.maxHeight = i.nextElementSibling.scrollHeight + "px");
            }
        }),
        window.addEventListener("resize", function () {
            this.innerWidth > menuCollaspeBreakpoint && e.classList.contains("open") && t(), this.innerWidth > menuCollaspeBreakpoint && e.querySelector(".active") && s();
        });
}
function styleSwitcherToggle() {
    let e = document.querySelector(".js-style-switcher"),
        t = document.querySelector(".js-style-switcher-toggler");
    t.addEventListener("click", function () {
        e.classList.toggle("open"), this.querySelector("i").classList.toggle("fa-times"), this.querySelector("i").classList.toggle("fa-cog");
    });
}
function themeColors() {
    let e = document.querySelector(".js-color-style"),
        t = document.querySelector(".js-theme-colors");
    function s() {
        let t = e.getAttribute("href").split("/");
        (t = t.slice(0, t.length - 1)),
            e.setAttribute("href", t.join("/") + "/" + localStorage.getItem("color") + ".css"),
            document.querySelector(".js-theme-color-item.active") && document.querySelector(".js-theme-color-item.active").classList.remove("active"),
            document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active");
    }
    if (
        (t.addEventListener("click", ({ target: e }) => {
            e.classList.contains("js-theme-color-item") && (localStorage.setItem("color", e.getAttribute("data-js-theme-color")), s());
        }),
        null !== localStorage.getItem("color"))
    )
        s();
    else {
        let i = e.getAttribute("href").split("/").pop().split(".").shift();
        document.querySelector("[data-js-theme-color=" + i + "]").classList.add("active");
    }
}
function themeLightDark() {
    let e = document.querySelector(".js-dark-mode");
    function t() {
        "false" === localStorage.getItem("theme-dark") ? document.body.classList.remove("t-dark") : document.body.classList.add("t-dark");
    }
    e.addEventListener("click", function () {
        this.checked ? localStorage.setItem("theme-dark", "true") : localStorage.setItem("theme-dark", "false"), t();
    }),
        null !== localStorage.getItem("theme-dark") && t(),
        document.body.classList.contains("t-dark") && (e.checked = !0);
}
function themeGlassEffect() {
    let e = document.querySelector(".js-glass-effect"),
        t = document.querySelector(".js-glass-style");
    function s() {
        "true" === localStorage.getItem("glass-effect") ? t.removeAttribute("disabled") : (t.disabled = !0);
    }
    e.addEventListener("click", function () {
        this.checked ? localStorage.setItem("glass-effect", "true") : localStorage.setItem("glass-effect", "false"), s();
    }),
        null !== localStorage.getItem("glass-effect") && s(),
        t.hasAttribute("disabled") || (e.checked = !0);
}
window.addEventListener("load", () => {
    document.querySelector(".js-page-loader").classList.add("fade-out"),
        setTimeout(() => {
            document.querySelector(".js-page-loader").style.display = "none";
        }, 600);
}),
    testimonialSlider(),
    coursePreviewVideo(),
    headerMenu(),
    styleSwitcherToggle(),
    themeColors(),
    themeLightDark(),
    themeGlassEffect();


const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF


// 4. Converting HTML table to JSON

const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
    let table_data = [],
        t_head = [],

        t_headings = table.querySelectorAll('th'),
        t_rows = table.querySelectorAll('tbody tr');

    for (let t_heading of t_headings) {
        let actual_head = t_heading.textContent.trim().split(' ');

        t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
    }

    t_rows.forEach(row => {
        const row_object = {},
            t_cells = row.querySelectorAll('td');

        t_cells.forEach((t_cell, cell_index) => {
            const img = t_cell.querySelector('img');
            if (img) {
                row_object['customer image'] = decodeURIComponent(img.src);
            }
            row_object[t_head[cell_index]] = t_cell.textContent.trim();
        })
        table_data.push(row_object);
    })

    return JSON.stringify(table_data, null, 4);
}

json_btn.onclick = () => {
    const json = toJSON(customers_table);
    downloadFile(json, 'json')
}

// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector('#toCSV');

const toCSV = function (table) {
    // Code For SIMPLE TABLE
    // const t_rows = table.querySelectorAll('tr');
    // return [...t_rows].map(row => {
    //     const cells = row.querySelectorAll('th, td');
    //     return [...cells].map(cell => cell.textContent.trim()).join(',');
    // }).join('\n');

    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join(',') + ',' + 'image name';

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            img = decodeURIComponent(row.querySelector('img').src),
            data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');

        return data_without_img + ',' + img;
    }).join('\n');

    return headings + '\n' + table_data;
}


// 6. Converting HTML table to EXCEL File


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


