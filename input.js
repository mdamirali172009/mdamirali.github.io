// ====================== INPUT SYSTEM ======================
const Input = {
    mouse: {
        left: false,
        middle: false,
        right: false,
        x: 0,
        y: 0
    }
};

// Mouse Button Handler
const handleMouseButton = (event, isPressed) => {
    switch (event.button) {
        case 0: // Left Button
            Input.mouse.left = isPressed;
            break;
        case 1: // Middle Button
            Input.mouse.middle = isPressed;
            break;
        case 2: // Right Button
            Input.mouse.right = isPressed;
            break;
    }
};

// ==================== EVENT LISTENERS ====================

// Mouse Button Press
document.addEventListener("mousedown", (event) => {
    handleMouseButton(event, true);
});

// Mouse Button Release
document.addEventListener("mouseup", (event) => {
    handleMouseButton(event, false);
});

// Mouse Movement
document.addEventListener("mousemove", (event) => {
    Input.mouse.x = event.clientX;
    Input.mouse.y = event.clientY;
});

// Right Click Menu Disable (গেমের জন্য খুব কাজের)
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// Optional: Mouse Wheel
document.addEventListener("wheel", (event) => {
    // চাইলে এখানে wheel handling যোগ করতে পারবে
    // console.log("Wheel scrolled:", event.deltaY);
}, { passive: true });
