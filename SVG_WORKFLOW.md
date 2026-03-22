# SVG Workflow and Animation Notes

This document captures the workflow used in this project to create and
animate a traced SVG (like `assets/blume1.svg`), plus a quick explanation
of how the draw‑in animation works.

## Workflow: From Image to SVG (Inkscape)

1. **Open your image in Inkscape.**
2. **Trace the bitmap:**
   - Go to **Path → Trace Bitmap**.
   - Common settings:
     - *Mode*: **Brightness cutoff** or **Edge detection**
     - *Threshold*: adjust until the preview looks clean
   - Click **Apply**.
3. **Clean up the trace (optional but recommended):**
   - **Path → Simplify** once or twice to smooth curves.
   - **Path → Clean Up** to remove tiny stray paths.
4. **Save as SVG:**
   - Use **Plain SVG** to keep the output clean.

## Workflow: Add the Draw‑In Animation

1. **Open the exported SVG file** (e.g., `assets/blume1.svg`) in your editor.
2. **Add a `<style>` block** inside `<defs>`.
3. **Duplicate the main path**:
   - One path is **stroke only** (for the drawing outline).
   - One path is **fill only** (for the final filled shape).
4. **Animate the stroke** using `stroke-dasharray` and `stroke-dashoffset`.
5. **Fade in the fill** after a short delay.

## How the Draw‑In Effect Works (Quick Explanation)

- `stroke-dasharray` sets the dash length (usually the full path length).
- `stroke-dashoffset` moves the dash pattern to hide the stroke.
- Animating `stroke-dashoffset` to `0` reveals the stroke as if it is drawn.
- The fill path starts with `opacity: 0` and fades in after the stroke draws.

## Where the Animation Lives

- **Inline (inside the SVG)**: works anywhere the SVG is embedded.
- **External CSS**: works best when the SVG is inlined in HTML (not `<object>`).

## Example Pattern (Conceptual)

```css
.draw-stroke {
  fill: none;
  stroke: #2b2b2b;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 4000;
  stroke-dashoffset: -4000;
  animation: draw-in 7s ease forwards;
}

.draw-fill {
  opacity: 0;
  animation: fill-in 2s ease forwards;
  animation-delay: 5.8s;
}
```

```css
@keyframes draw-in {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill-in {
  to {
    opacity: 1;
  }
}
```

## Tips for a Softer, Wedding‑Style Look

- Use a **slightly thinner stroke** (e.g., `1.4`–`1.8`).
- Use a **softer black** (e.g., `#2b2b2b` instead of pure black).
- Add a **small opacity reduction** on the stroke (e.g., `0.8`–`0.9`).

