import type React from "react";

type Axis = 'x' | 'y' | null;

export type SwipeServiceOptions = {
    swipeDistance?: number;
    swipeTime?: number;
    axisThreshold?: number;
};

export class SwipeService {
    private start = { x: 0, y: 0, t: 0 };
    private axisLock: Axis = null;

    private readonly swipeDistance: number;
    private readonly swipeTime: number;
    private readonly axisThreshold: number;

    private readonly isEnabled: () => boolean;
    private readonly onSwipeLeft: () => void;
    private readonly onSwipeRight: () => void;

    constructor(
        isEnabled: () => boolean,
        onSwipeLeft: () => void,
        onSwipeRight: () => void,
        opts: SwipeServiceOptions = {}
    ) {
        this.isEnabled = isEnabled;
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;

        this.swipeDistance = opts.swipeDistance ?? 60;
        this.swipeTime = opts.swipeTime ?? 600;
        this.axisThreshold = opts.axisThreshold ?? 10;
    }

    onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
        if (!this.isEnabled()) return;

        this.axisLock = null;
        this.start = { x: e.clientX, y: e.clientY, t: Date.now() };

        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
        if (!this.isEnabled()) return;

        const dx = e.clientX - this.start.x;
        const dy = e.clientY - this.start.y;

        if (!this.axisLock) {
            if (Math.abs(dx) > this.axisThreshold || Math.abs(dy) > this.axisThreshold) {
                this.axisLock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
            }
        }

        if (this.axisLock === 'x') {
            e.preventDefault();
        }
    };

    onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
        if (!this.isEnabled()) return;

        const dx = e.clientX - this.start.x;
        const dt = Date.now() - this.start.t;

        if (this.axisLock === 'x' && Math.abs(dx) > this.swipeDistance && dt < this.swipeTime) {
            if (dx < 0) this.onSwipeLeft();
            else this.onSwipeRight();
        }

        this.axisLock = null;
    };
}