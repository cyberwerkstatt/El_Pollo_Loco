class StatusbarIconEndboss extends DrawableObject {
    x = 547;
    y = 50;
    width = 70;
    height = 70;
    imageIconEnbossStatusbar = [
        'img/7_statusbars/3_icons/icon_health_endboss.png',
    ];


    constructor() {
        super().loadImage(this.imageIconEnbossStatusbar);
    }
}