/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

document.addEventListener('DOMContentLoaded', function() {
    $('.saveJobs').hide()
        // DOM is fully loaded
    console.log('DOM fully loaded and parsed asdasd');

    onDeviceReady()
});

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');
    console.log(navigator.device.capture);
}


var globalResult = []

const calError = () => {
    globalResult = []
    let peano = $('#pea_no').val()
    if (peano == '') {
        alert('กรุณาระบุ PEA No.')
        return
    }

    if (usage_type == '' || meter_type == '') {
        alert('กรุณาเลือกชนิดมิเตอร์ และ ประเภทการใช้งาน ก่อนกดปุ่มคำนวณ')
        return
    }
    let result = 0;
    result = (calPrev() / calPmea() - 1) * 100;

    console.log("error", result.toFixed(4));
    $(".error-text").html(result.toFixed(4));

    if (isNaN(result)) {
        $(".error-result").html('<b class="text-danger">ไม่สามารถคำนวณได้กรุณาระบุค่าใหม่</b>');
        return;
    } else if (result.toFixed(4) < -2.5 || result.toFixed(4) > 2.5) {
        $(".error-result").html('<b class="text-danger">ไม่ผ่านการทดสอบ</b>');
    } else {
        $(".error-result").html('<b class="text-success">ผ่านการทดสอบ</b>');
    }

    globalResult.push({
        'isMethod': isMethod,
        'pea_no': peano,
        'pmea': calPmea(),
        'prev': calPrev(),
        'error': result.toFixed(4)
    })
    localStorage.setItem('globalResult', JSON.stringify(globalResult))
    console.log('globalResult', globalResult)

    $('.saveJobs').show()
    return result.toFixed(4);
};

const saveJobs = () => {
    window.location.href = 'result.html';
};

const captureScreenshot = () => {
    console.log("กำลังจับภาพหน้าจอ...");

    // ใช้ Plugin cordova-plugin-screenshot
    Screenshot.capture(function(err, imageData) {
        if (err) {
            console.error("เกิดข้อผิดพลาดในการจับภาพหน้าจอ:", err);
            return;
        }

        console.log("จับภาพหน้าจอสำเร็จ:", imageData);

        // บันทึกภาพที่จับได้
        const fileName = "screenshot_" + new Date().getTime() + ".png";
        const directory = cordova.file.externalRootDirectory + "Pictures/Screenshots/";

        window.resolveLocalFileSystemURL(directory, (dirEntry) => {
            console.log("เข้าถึงโฟลเดอร์แล้ว");
            dirEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
                console.log("สร้างไฟล์ในโฟลเดอร์แล้ว");
                fileEntry.createWriter((fileWriter) => {
                    fileWriter.write(imageData);
                    console.log("บันทึกไฟล์สำเร็จ: " + fileEntry.nativeURL);
                    alert("บันทึกสำเร็จ: " + fileEntry.nativeURL);
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    });
};

const errorHandler = (error) => {
    console.error("ข้อผิดพลาดในการเข้าถึงไฟล์:", error);
    alert("เกิดข้อผิดพลาดในการบันทึกไฟล์");
};

const clearElement = () => {
    console.log("clear all!");
    globalResult = []
    $('.saveJobs').hide()
    $(".renderTime,.renderDOM").html("");
    $(".kwResult,.error-text,.textPreResultMeter").html("0.0000");
    $(".error-result").html("รอผลการทดสอบ");
};