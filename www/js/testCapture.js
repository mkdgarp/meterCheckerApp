document.addEventListener('deviceready', function() {
    console.log('ready')

    document.getElementById('btn1').addEventListener('click', screenshotCordovaPlugin);
    document.getElementById('btn2').addEventListener('click', screenshotNavigator);
    document.getElementById('btn3').addEventListener('click', screenshotCamera);
    document.getElementById('btn4').addEventListener('click', screenshotHtml2Canvas);
    document.getElementById('btn5').addEventListener('click', screenshotMediaProjection);
    document.getElementById('btn6').addEventListener('click', screenshotWebView);
    document.getElementById('btn7').addEventListener('click', screenshotCanvasToBlob);
    document.getElementById('btn8').addEventListener('click', screenshotFileAPI);
    document.getElementById('btn9').addEventListener('click', screenshotScreenCaptureIntent);
    document.getElementById('btn10').addEventListener('click', screenshotADB);

    // 1. ใช้ `cordova-plugin-screenshot`
    function screenshotCordovaPlugin() {
        Screenshot.capture(function(error, path) {
            if (error) console.error("Error:", error);
            else console.log("Saved at:", path);
        });
    }

    // 2. ใช้ `navigator.screenshot.save`
    function screenshotNavigator() {
        navigator.screenshot.save(function(error, res) {
            if (error) console.error("Error:", error);
            else console.log("Saved at:", res.filePath);
        }, 'jpg', 100, 'Pictures');
    }

    // 3. ใช้ `cordova-plugin-camera` ในโหมด `SCREENSHOT`
    function screenshotCamera() {
        navigator.camera.getPicture(function(imageURI) {
            console.log("Captured:", imageURI);
        }, function(error) {
            console.error("Error:", error);
        }, {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }

    // 4. ใช้ `html2canvas`
    function screenshotHtml2Canvas() {
        html2canvas(document.body).then(canvas => {
            canvas.toBlob(blob => {
                console.log("Captured Blob:", blob);
            });
        });
    }

    // 5. ใช้ `MediaProjection API` (ผ่าน Plugin)
    function screenshotMediaProjection() {
        cordova.plugins.MediaProjection.screenshot(function(path) {
            console.log("Saved at:", path);
        }, function(error) {
            console.error("Error:", error);
        });
    }

    // 6. ใช้ `webview.captureScreenshot`
    function screenshotWebView() {
        webview.captureScreenshot(function(path) {
            console.log("Saved at:", path);
        }, function(error) {
            console.error("Error:", error);
        });
    }

    // 7. ใช้ `canvas.toBlob`
    function screenshotCanvasToBlob() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(10, 10, 100, 100);
        canvas.toBlob(blob => {
            console.log("Captured Blob:", blob);
        });
    }

    // 8. ใช้ `File API`
    function screenshotFileAPI() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 10, 100, 100);
        let dataURL = canvas.toDataURL();
        let blob = dataURItoBlob(dataURL);
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
            dir.getFile("screenshot.png", {
                create: true
            }, function(file) {
                file.createWriter(function(writer) {
                    writer.write(blob);
                    console.log("Saved at:", cordova.file.dataDirectory + "screenshot.png");
                });
            });
        });
    }

    // 9. ใช้ `Screen Capture Intent`
    function screenshotScreenCaptureIntent() {
        cordova.exec(function(result) {
            console.log("Captured:", result);
        }, function(error) {
            console.error("Error:", error);
        }, "ScreenCapture", "capture", []);
    }

    // 10. ใช้ `adb shell screencap`
    function screenshotADB() {
        cordova.exec(function(result) {
            console.log("Captured:", result);
        }, function(error) {
            console.error("Error:", error);
        }, "ADB", "screencap", ["/sdcard/screenshot.png"]);
    }

    // Helper function
    function dataURItoBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let arrayBuffer = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], {
            type: mimeString
        });
    }

    function xx() {
        navigator.screenshot.save(function(error, res) {
            if (error) {
                console.error(error);
            } else {
                console.log('ok', res.filePath);
            }
        });
    }

    // โค้ดที่ต้องการใช้ Cordova API
    document.getElementById('screenshotBtn').addEventListener('click', function() {
        // ขอ permission สำหรับ WRITE_EXTERNAL_STORAGE และ READ_EXTERNAL_STORAGE
        var permissions = [
            cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
            cordova.plugins.permissions.READ_EXTERNAL_STORAGE
        ];

        cordova.plugins.permissions.hasPermission(permissions[0], function(status) {
            if (status.hasPermission) {
                captureScreenshot();
            } else {
                cordova.plugins.permissions.requestPermissions(permissions, function(status) {
                    if (status.hasPermission) {
                        alert("Permission OK");
                        captureScreenshot(); 
                    } else {
                        // ถ้าไม่ได้รับ permission ลองขอแบบเดี่ยวอีกครั้ง
                        cordova.plugins.permissions.requestPermission(permissions[0], function(status) {
                            if(status.hasPermission) {
                                alert("Permission OK");
                                captureScreenshot();
                            } else {
                                alert("Permission denied to access storage. Please enable manually in Settings.");
                            }
                        }, function(error) {
                            console.error("Permission request failed: ", error);
                        });
                    }
                }, function(error) {
                    console.error("Permission request failed: ", error);
                });
            }
        });
    });

    function captureScreenshot() {
        // เรียกใช้คำสั่ง capture ของ plugin screenshot
        Screenshot.capture(function(result) {
            console.log("Screenshot captured successfully:", result);
            alert("Screenshot captured successfully");
            // result จะเป็น path ของไฟล์ที่บันทึก
            saveScreenshot(result);
        }, function(error) {
            console.error("Error capturing screenshot: ", error);
            alert("Error capturing screenshot");
        });
    }

    function saveScreenshot(path) {
        // บันทึกภาพลงใน storage หรือที่ที่ต้องการ
        console.log("Saving screenshot to:", path);
        // คุณสามารถทำการเก็บไฟล์ในที่เก็บข้อมูลต่างๆ ตามต้องการได้
    }


});