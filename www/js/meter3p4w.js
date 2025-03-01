const fixREV = `<input type="number" id="rev_impulse" placeholder="Rev,Impulse/kWh" />`

var isMethod = 1;
let Pmea = 0
let Prev = 0
let errorResult = 0
let kwManual = 0 //ค่ากรอกเอง digital
let kwResult = 0 //ค่าที่ใช้จริง
let kwMeasured = 0 //ค่าที่วัดได้ .textPreResultMeter

const calPmea = () => {
    console.log('calPmea')
    $('.kwResult_A').val(0)
    $('.kwResult_B').val(0)
    $('.kwResult_C').val(0)
    if (usage_type == 2) {
        // let v = $('.Vvalue').val()
        // let i = $('.Avalue').val()
        // let pf = $('.PFvalue').val()
        // let v = 236
        // let i = 13.85
        // let pf = 0.84

        let Pmea_A = ($('.Vvalue_A').val() * $('.Avalue_A').val() * $('.PFvalue_A').val()) / 1000
        let Pmea_B = ($('.Vvalue_B').val() * $('.Avalue_B').val() * $('.PFvalue_B').val()) / 1000
        let Pmea_C = ($('.Vvalue_C').val() * $('.Avalue_C').val() * $('.PFvalue_C').val()) / 1000


        console.log('pmea', Pmea_A, Pmea_B, Pmea_C)
        Pmea = ((Pmea_A + Pmea_B + Pmea_C))
        $('.kwResult_A').val(Pmea_A)
        $('.kwResult_B').val(Pmea_B)
        $('.kwResult_C').val(Pmea_C)
    } else if (usage_type == 3) {
        let kw_A = Number($('.KWvalue_A').val())
        let kw_B = Number($('.KWvalue_B').val())
        let kw_C = Number($('.KWvalue_C').val())
        Pmea = kw_A + kw_B + kw_C
        console.log(kw_A, kw_B, kw_C)
    }
    // console.log('Pmea', Pmea.toFixed(4));

    $('.kwResult').html(Pmea.toFixed(4))
    return Pmea.toFixed(4)

}

const calPrev = () => {
    console.log('calPrev')
    let result
    if (meter_type == 'analog') {
        // let a = 400;
        // let b = 3600;
        // let c = 1;
        // let d = 3.06;
        let a = $('#rev_impulse').val();
        let b = 3600;
        let c = $('.roundTest').val();
        let d = milliseconds / 100;

        console.log('analog ', b, a, c, d)
        console.log((b / a), (c / d))

        result = ((b / a) * (c / d)) * 1000;

    } else if (meter_type == 'digital') {
        let CODEvalue = $('.CODEvalue').val()

        result = CODEvalue * 1
    }

    console.log('Prev', result.toFixed(4));

    $('.textPreResultMeter').html(result.toFixed(4))
    return result.toFixed(4);
};


const digitalNormal = () => {
    let html = ''
    html +=
        `

        <div>
            <b>ป้อนค่า kW ที่มิเตอร์วัดได้</b>
        </div>
        <div><input class="form-control CODEvalue" type="text" value="" placeholder="CODE 093/097" /></div>
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
            <input class="form-control ms-auto w-25 text-center Vvalue_A" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Vvalue_B" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Vvalue_C" type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">กระแส(A)</label>
            <input class="form-control ms-auto w-25 text-center Avalue_A" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Avalue_B" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Avalue_C" type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">Power<br/>factor(pf.)</label>
            <input class="form-control ms-auto w-25 text-center PFvalue_A" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center PFvalue_B" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center PFvalue_C" type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">ค่าkWแต่ละเฟส</label>
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white kwResult_A" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white kwResult_B" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white kwResult_C" disabled type="text" value="0.0000"  />
        </div>
        <div class="">ค่ารวมkWที่ใช้จริง <span class=" text-danger kwResult ">0.0000</span></div>
        <div class="mt-2">
            <b>ป้อนค่า kW ที่มิเตอร์วัดได้</b>
        </div>
        <div><input class="form-control CODEvalue" type="text" value="" placeholder="CODE 093/097" /></div>
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
            <input class="form-control ms-auto w-25 KWvalue_A" type="text" value="" />
            <input class="form-control ms-auto w-25 KWvalue_B" type="text" value="" />
            <input class="form-control ms-auto w-25 KWvalue_C" type="text" value="" />
            </div>
        <div>ค่ารวมkWที่ใช้จริง : <span class="text-danger kwResult">0.0000</span></div>
        <div class="mt-2">
            <b>ป้อนค่า kW ที่มิเตอร์วัดได้</b>
        </div>
        <div><input class="form-control CODEvalue" type="text" value="" placeholder="CODE 093/097" /></div>
        <div class="preResultMether">ค่ามิเตอร์ที่วัดได้ <span class="textPreResultMeter text-danger">0.0000</span></div>
        

    `
    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}

const analogRound = `
<div class="roundTestDIV">
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


const analogAVpf = () => {
    let html = ''
    html += `
    <div>
    ${fixREV} 
    </div>
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
            <input class="form-control ms-auto w-25 text-center Vvalue_A" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Vvalue_B" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Vvalue_C" type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">กระแส(A)</label>
            <input class="form-control ms-auto w-25 text-center Avalue_A" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Avalue_B" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center Avalue_C" type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">Power<br/>factor(pf.)</label>
            <input class="form-control ms-auto w-25 text-center PFvalue_A" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center PFvalue_B" type="text" value=""  />
            <input class="form-control ms-auto w-25 text-center PFvalue_C" type="text" value=""  />
        </div>
        <div class="d-inline-flex align-items-center w-100">
            <label class="form-label" style="width: 70px;">ค่าkWแต่ละเฟส</label>
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white kwResult_A" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white kwResult_B" disabled type="text" value="0.0000"  />
            <input class="form-control ms-auto w-25 text-center text-danger border-0 bg-white kwResult_C" disabled type="text" value="0.0000"  />
        </div>
        <div class="">ค่ารวมkWที่ใช้จริง <span class=" text-danger kwResult">0.0000</span></div>
    
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
    </div>
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
            <input class="form-control ms-auto w-25 KWvalue_A" type="text" value="" />
            <input class="form-control ms-auto w-25 KWvalue_B" type="text" value="" />
            <input class="form-control ms-auto w-25 KWvalue_C" type="text" value="" />
            </div>
        <div>ค่ารวมkWที่ใช้จริง : <span class="text-danger kwResult">0.0000</span></div>
    </div>
    `

    let renderDOM = $('.renderDOM')
    renderDOM.html(html)
}