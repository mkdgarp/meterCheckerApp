// วิธีที่ 1: ใช้ Promise แทน callback

document.addEventListener('deviceready', function() {
    console.log('ready');

    document.getElementById('screenshotBtn_1').addEventListener('click', async function() {
        try {
            await requestPermission();
            captureScreenshot();
        } catch (error) {
            alert(error.message);
        }
    });

    function requestPermission() {
        return new Promise((resolve, reject) => {
            var permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
                if (status.hasPermission) {
                    resolve();
                } else {
                    permissions.requestPermissions([permissions.WRITE_EXTERNAL_STORAGE, permissions.READ_EXTERNAL_STORAGE], function(status) {
                        status.hasPermission ? resolve() : reject(new Error("Permission denied"));
                    }, reject);
                }
            });
        });
    }

    function captureScreenshot() {
        Screenshot.capture(result => alert("Screenshot captured: " + result), error => alert("Error: " + error));
    }
});

// วิธีที่ 2: ใช้ async/await แทน callback

document.addEventListener('deviceready', function() {
    console.log('ready');

    document.getElementById('screenshotBtn_2').addEventListener('click', async function() {
        try {
            let permissionGranted = await checkPermission();
            if (!permissionGranted) await requestPermission();
            captureScreenshot();
        } catch (error) {
            alert(error.message);
        }
    });

    async function checkPermission() {
        return new Promise(resolve => {
            cordova.plugins.permissions.hasPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, function(status) {
                resolve(status.hasPermission);
            });
        });
    }

    async function requestPermission() {
        return new Promise((resolve, reject) => {
            cordova.plugins.permissions.requestPermissions([cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, cordova.plugins.permissions.READ_EXTERNAL_STORAGE], function(status) {
                status.hasPermission ? resolve() : reject(new Error("Permission denied"));
            }, reject);
        });
    }

    function captureScreenshot() {
        Screenshot.capture(result => alert("Screenshot captured: " + result), error => alert("Error: " + error));
    }
});

// วิธีที่ 3: ใช้ Event Delegation

document.addEventListener('deviceready', function() {
    console.log('ready');

    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'screenshotBtn_3') {
            checkAndCapture();
        }
    });

    function checkAndCapture() {
        cordova.plugins.permissions.hasPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, function(status) {
            if (status.hasPermission) {
                captureScreenshot();
            } else {
                cordova.plugins.permissions.requestPermissions([cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, cordova.plugins.permissions.READ_EXTERNAL_STORAGE], function(status) {
                    if (status.hasPermission) {
                        captureScreenshot();
                    } else {
                        alert("Permission denied");
                    }
                });
            }
        });
    }

    function captureScreenshot() {
        Screenshot.capture(result => alert("Screenshot captured: " + result), error => alert("Error: " + error));
    }
});

// วิธีที่ 4: ใช้ IIFE (Immediately Invoked Function Expression)

document.addEventListener('deviceready', function() {
    console.log('ready');

    (function setupButton() {
        document.getElementById('screenshotBtn_4').addEventListener('click', function() {
            cordova.plugins.permissions.hasPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, function(status) {
                if (status.hasPermission) {
                    captureScreenshot();
                } else {
                    cordova.plugins.permissions.requestPermissions([cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, cordova.plugins.permissions.READ_EXTERNAL_STORAGE], function(status) {
                        status.hasPermission ? captureScreenshot() : alert("Permission denied");
                    });
                }
            });
        });
    })();

    function captureScreenshot() {
        Screenshot.capture(result => alert("Screenshot captured: " + result), error => alert("Error: " + error));
    }
});

// วิธีที่ 5: ใช้ ES6 Class

class ScreenshotHandler {
    constructor(buttonId) {
        this.button = document.getElementById(buttonId);
        if (this.button) {
            this.button.addEventListener('click', () => this.handleClick());
        }
    }

    handleClick() {
        cordova.plugins.permissions.hasPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, status => {
            if (status.hasPermission) {
                this.captureScreenshot();
            } else {
                cordova.plugins.permissions.requestPermissions([cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, cordova.plugins.permissions.READ_EXTERNAL_STORAGE], status => {
                    status.hasPermission ? this.captureScreenshot() : alert("Permission denied");
                });
            }
        });
    }

    captureScreenshot() {
        Screenshot.capture(result => alert("Screenshot captured: " + result), error => alert("Error: " + error));
    }
}

document.addEventListener('deviceready', function() {
    console.log('ready');
    new ScreenshotHandler('screenshotBtn_5');
});

document.addEventListener('deviceready', function() {
    console.log('Device is ready');

    document.getElementById('screenshotBtn').addEventListener('click', function() {
        checkPermissions()
            .then(captureScreenshot)
            .then(saveToGallery)
            .catch(error => {
                alert("Error: " + error.message);
                if (error.message.includes("Permission denied")) {
                    promptUserToEnablePermission();
                }
            });
    });

    async function checkPermissions() {
        return new Promise((resolve, reject) => {
            var permissions = cordova.plugins.permissions;
            var perms = [
                permissions.WRITE_EXTERNAL_STORAGE,
                permissions.READ_EXTERNAL_STORAGE
            ];
            permissions.hasPermission(perms[0], function(status) {
                if (status.hasPermission) {
                    resolve();
                } else {
                    permissions.requestPermissions(perms, function(status) {
                        if (status.hasPermission) {
                            resolve();
                        } else {
                            reject(new Error("Permission denied"));
                        }
                    }, reject);
                }
            });
        });
    }

    function captureScreenshot() {
        return new Promise((resolve, reject) => {
            Screenshot.capture(uri => {
                console.log("Screenshot captured: " + uri);
                resolve(uri);
            }, error => reject(new Error("Failed to capture screenshot")));
        });
    }

    function saveToGallery(filePath) {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(filePath, function(fileEntry) {
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dirEntry) {
                    dirEntry.getDirectory("DCIM/Screenshots", { create: true }, function(targetDir) {
                        fileEntry.moveTo(targetDir, "screenshot_" + Date.now() + ".png", function(newFile) {
                            console.log("Saved to: " + newFile.nativeURL);
                            alert("Screenshot saved to Gallery!");
                            resolve(newFile.nativeURL);
                        }, reject);
                    }, reject);
                }, reject);
            }, reject);
        });
    }

    function promptUserToEnablePermission() {
        alert("กรุณาเปิดสิทธิ์จัดการไฟล์ที่ Settings > Apps > Your App > Permissions");
        cordova.plugins.permissions.requestPermission(
            cordova.plugins.permissions.MANAGE_EXTERNAL_STORAGE,
            function(status) {
                if (!status.hasPermission) {
                    alert("คุณต้องเปิดสิทธิ์ MANAGE_EXTERNAL_STORAGE เพื่อให้แอปบันทึกภาพลงแกลลอรี่");
                }
            },
            function(error) {
                console.error("Failed to request MANAGE_EXTERNAL_STORAGE: ", error);
            }
        );
    }
});