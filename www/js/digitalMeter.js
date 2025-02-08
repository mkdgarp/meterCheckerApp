const digitalNormal = () => {
    let html = ''
    html +=
        `
        <div>
            <span>ป้อนค่ามิเตอร์ที่วัดได้</span>
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
        <div>
            <span>ป้อนค่า V , I , pf จากแคลมป์มิเตอร์</span>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">V</label>
            <input class="form-control ms-auto w-25" type="text" value="" placeholder="V" /></div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">A</label>
            <input class="form-control ms-auto w-25" type="text" value="" placeholder="A" /></div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">pf</label>
            <input class="form-control ms-auto w-25" type="text" value="" placeholder="pf" /></div>
        <div class="">ค่าKWที่ใช้จริง <span class=" text-danger">0.0000</span></div>
        <div class="mt-2">
            <span>ป้อนค่ามิเตอร์ที่วัดได้</span>
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
        <div>
            <span>ป้อนค่า kW จากแคมป์มิเตอร์</span>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label">KW</label>
            <input class="form-control ms-auto w-25" type="text" value="" placeholder="V" /></div>
        
        <div class="mt-2">
            <span>ป้อนค่ามิเตอร์ที่วัดได้</span>
        </div>
        <div><input class="form-control" type="text" value="" placeholder="CODE012/345" /></div>
        <div class="preResultMether">ค่ามิเตอร์ที่วัดได้ <span class="textPreResultMeter text-danger">0.0000</span></div>
    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}

const analogNormal = () => {
    let html = ''
    html += `
    
    <div>
    
    
    </div>
    `
}


const analogAVpf = () => {
    let html = ''
    html += `
    
    <div>
    
    
    </div>
    `
}


const analogKWh = () => {
    let html = ''
    html += `
    
    <div>
    
    
    </div>
    `
}