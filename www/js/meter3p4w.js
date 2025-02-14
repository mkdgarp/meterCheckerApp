const fixREV = `<input type="number" id="rev_impulse" placeholder="Rev,Impulse/kWh" />`

const digitalNormal = () => {
    let html = ''
    html +=
        `

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
        <div>
            <b>ป้อนค่า V , I , pf จากแคลมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
        <div class="w-25" >&nbsp;</div>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase A" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase B" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase C" disabled/>
        </div>
        <div class="d-inline-flex align-items-center w-100">
        
            <label class="form-label" style="width: 70px;">แรงดัน(V)</label>
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">กระแส(A)</label>
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">Power<br/>factor(pf.)</label>
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">ค่าkWแต่ละเฟส</label>
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white" disabled type="text" value="0.0000"  />
        </div>
        <div class="">ค่ารวมkWที่ใช้จริง <span class=" text-danger ">0.0000</span></div>
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
        <div>
            <b>ป้อนค่า kW จากแคมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
        <div class="w-25" >&nbsp;</div>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase A" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase B" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase C" disabled/>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label " style="width: 70px;">ค่า kW</label>
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" />
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" />
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" />
            </div>
        <div>ค่ารวมkWที่ใช้จริง : <span class="text-danger">0.0000</span></div>
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
    
            <b>ป้อนค่า kW จากแคมป์มิเตอร์</b>
        </div>
        <div class="d-inline-flex align-items-center w-100">
        <div class="w-25" >&nbsp;</div>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase A" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase B" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase C" disabled/>
        </div>
        <div class="d-inline-flex align-items-center w-100">
        
            <label class="form-label" style="width: 70px;">แรงดัน(V)</label>
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">กระแส(A)</label>
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">Power<br/>factor(pf.)</label>
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">ค่าkWแต่ละเฟส</label>
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white" disabled type="text" value="0.0000"  />
        </div>
        <div class="">ค่ารวมkWที่ใช้จริง <span class=" text-danger">0.0000</span></div>
    
    </div>
    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}


const analogAVpf = () => {
    let html = ''
    html += `
    
            <b>ป้อนค่า V , I , pf จากแคลมป์มิเตอร์</b>
        </div>
         <div class="d-inline-flex align-items-center w-100">
        <div class="w-25" >&nbsp;</div>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase A" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase B" disabled/>
            <input class="ms-auto w-25 text-danger border-0 bg-white" value="Phase C" disabled/>
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label " style="width: 70px;">ค่า kW</label>
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" />
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" />
            <input class="form-control ms-auto w-25" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" value="" />
            </div>
        <div>ค่ารวมkWที่ใช้จริง : <span class="text-danger">0.0000</span></div>
    </div>
    `

    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}