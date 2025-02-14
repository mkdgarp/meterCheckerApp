const fixREV = `<input type="number" id="rev_impulse" placeholder="Rev,Impulse/kWh" />`

let Pmea = 0
let Prev = 0
let errorResult = 0
let kwManual = 0 //ค่ากรอกเอง digital
let kwResult = 0 //ค่าที่ใช้จริง
let kwMeasured = 0 //ค่าที่วัดได้ .textPreResultMeter

const calPmea = () => {
    let v = $('.Vvalue').val()
    let i = $('.Avalue').val()
    let pf = $('.PFvalue').val()
        // let v = 236
        // let i = 13.85
        // let pf = 0.84

    Pmea = v * i * pf
    console.log('Pmea', Pmea.toFixed(4));
    return Pmea.toFixed(4)
}

//only analog//
const calPrev = () => {
    let a = 400;
    let b = 3600;
    let c = 1;
    let d = 3.06;

    console.log((b / a), (c / d))

    let result = ((b / a) * (c / d)) * 1000;
    console.log('Prev', result.toFixed(4));

    return result.toFixed(4);
};

const calError = () => {
    let result = ((calPrev() / calPmea()) - 1) * 100
    console.log('error', result.toFixed(4))
    return result.toFixed(4)
}

const digitalNormal = () => {
    let html = ''
    html +=
        `
        ${fixREV}

        <div>
            <b>ป้อนค่า kW ที่มิเตอร์วัดได้</b>
        </div>
        <div><input class="form-control" type="text" value="" placeholder="CODE012/345" /></div>
        <div class="preResultMether">ค่ามิเตอร์ที่วัดได้ <span class="textPreResultMeter text-danger">0.0000</span></div>
        
    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}

const digitalVApf = () => {
    let html = ''
    html +=
        `
        
        ${fixREV}
        <div>
            <b>ป้อนค่า V , I , pf จากแคลมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">แรงดัน(V)</label>
            <input class="form-control ms-auto w-25 Vvalue" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  /></div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">กระแส(A)</label>
            <input class="form-control ms-auto w-25 Avalue" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  /></div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">Powerfactor(pf.)</label>
            <input class="form-control ms-auto w-25 PFvalue" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" /></div>
        <div class="">ค่าkWที่ใช้จริง <span class=" text-danger kwResult">0.0000</span></div>
        <div class="mt-2">
            <b>ป้อนค่า kW ที่มิเตอร์วัดได้</b>
        </div>
        <div><input class="form-control" type="text" value="" placeholder="CODE012/345" /></div>
        <div class="preResultMether">ค่ามิเตอร์ที่วัดได้ <span class="textPreResultMeter text-danger">0.0000</span></div>
    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}
const digitalkWh = () => {
    let html = ''
    html +=
        `
        
        ${fixREV}
        <div>
            <b>ป้อนค่า kW จากแคมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">ค่า kW</label>
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" /></div>
        <div>ค่าkWที่ใช้จริง : <span class="text-danger">0.0000</span></div>
        <div class="mt-2">
            <b>ป้อนค่า kW ที่มิเตอร์วัดได้</b>
        </div>
        <div><input class="form-control" type="text" value="" placeholder="CODE012/345" /></div>
        <div class="preResultMether">ค่ามิเตอร์ที่วัดได้ <span class="textPreResultMeter text-danger">0.0000</span></div>
        

    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}

const analogRound = `
<div class="roundTest">
            <div>รอบจานหมุนที่ทดสอบ</div>
            <div>
                <select class="form-select roundTest">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
            </div>
        </div>
`
const analogNormal = () => {
    let html = ''
    html += `
    
    <div>
    
    ${fixREV} 
    </div>
    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}


const analogKWh = () => {
    let html = ''
    html += `
    
    <div>
    ${fixREV} 
    <div>
            <b>ป้อนค่า kW จากแคมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">ค่า kW</label>
            <input class="form-control ms-auto w-25" type="text" value="" /></div>
        <div>ค่าkWที่ใช้จริง : <span class="text-danger kwResult">0.0000</span></div>
    
    </div>
    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}


const analogAVpf = () => {
    let html = ''
    html += `
    
    <div>
    ${fixREV}
    <div>
            <b>ป้อนค่า V , I , pf จากแคลมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">แรงดัน(V)</label>
            <input class="form-control ms-auto w-25" type="text" value=""  /></div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">กระแส(A)</label>
            <input class="form-control ms-auto w-25" type="text" value=""  /></div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">Powerfactor(pf.)</label>
            <input class="form-control ms-auto w-25" type="text" value="" /></div>
        <div class="">ค่าkWที่ใช้จริง <span class=" text-danger kwResult">0.0000</span></div>
    </div>
    `

    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}