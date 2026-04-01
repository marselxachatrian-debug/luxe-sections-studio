import { useEffect, useMemo, useRef, useState } from "react";
import {
  BlockStack,
  Box,
  InlineGrid,
  InlineStack,
  RangeSlider,
  Text,
  TextField,
} from "@shopify/polaris";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function componentToHex(value) {
  const hex = clamp(Number(value) || 0, 0, 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function parseHexColor(input) {
  const value = String(input || "").trim();

  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    return null;
  }

  const normalized =
    value.length === 4
      ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
      : value;

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
    a: 1,
  };
}

function parseRgbColor(input) {
  const value = String(input || "").trim();
  const match = value.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i,
  );

  if (!match) {
    return null;
  }

  return {
    r: clamp(Number.parseFloat(match[1]), 0, 255),
    g: clamp(Number.parseFloat(match[2]), 0, 255),
    b: clamp(Number.parseFloat(match[3]), 0, 255),
    a: clamp(
      match[4] == null ? 1 : Number.parseFloat(match[4]),
      0,
      1,
    ),
  };
}

function parseColor(input, fallback = "#000000") {
  return (
    parseHexColor(input) ||
    parseRgbColor(input) ||
    parseHexColor(fallback) || {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    }
  );
}

function formatAlpha(alpha) {
  const rounded = Math.round(alpha * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function formatColor({ r, g, b, a }) {
  if (a >= 0.999) {
    return rgbToHex(r, g, b);
  }

  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${formatAlpha(a)})`;
}

const DEFAULT_PRESETS = [
  "#ffffff",
  "#000000",
  "#0f172a",
  "#1f2937",
  "#f8e7b0",
  "#d6b37a",
  "#e5e7eb",
  "#111827",
];

export function ColorField({
  label,
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  fallback = "#000000",
  helpText,
}) {
  const pickerRef = useRef(null);

  const parsed = useMemo(() => parseColor(value, fallback), [value, fallback]);

  const [textValue, setTextValue] = useState(formatColor(parsed));
  const [alphaValue, setAlphaValue] = useState(Math.round(parsed.a * 100));

  useEffect(() => {
    setTextValue(formatColor(parsed));
    setAlphaValue(Math.round(parsed.a * 100));
  }, [parsed]);

  function emitColor(nextColor) {
    const formatted = formatColor(nextColor);
    setTextValue(formatted);
    onChange?.(formatted);
  }

  function handleHexChange(nextHex) {
    const parsedHex = parseHexColor(nextHex);

    if (!parsedHex) {
      return;
    }

    emitColor({
      ...parsedHex,
      a: alphaValue / 100,
    });
  }

  function handleAlphaChange(nextAlpha) {
    const numericAlpha = Array.isArray(nextAlpha) ? nextAlpha[0] : nextAlpha;
    setAlphaValue(numericAlpha);

    emitColor({
      r: parsed.r,
      g: parsed.g,
      b: parsed.b,
      a: numericAlpha / 100,
    });
  }

  function handleTextChange(nextValue) {
    setTextValue(nextValue);
  }

  function handleTextBlur() {
    const nextParsed = parseColor(textValue, fallback);

    setAlphaValue(Math.round(nextParsed.a * 100));
    onChange?.(formatColor(nextParsed));
  }

  function applyPreset(preset) {
    const parsedPreset = parseColor(preset, fallback);

    emitColor({
      ...parsedPreset,
      a: alphaValue / 100,
    });
  }

  const currentHex = rgbToHex(parsed.r, parsed.g, parsed.b);
  const previewBackground =
    alphaValue < 100
      ? `linear-gradient(0deg, rgba(${Math.round(parsed.r)}, ${Math.round(parsed.g)}, ${Math.round(parsed.b)}, ${alphaValue / 100}), rgba(${Math.round(parsed.r)}, ${Math.round(parsed.g)}, ${Math.round(parsed.b)}, ${alphaValue / 100}))`
      : currentHex;

  return (
    <BlockStack gap="200">
      <InlineGrid columns={{ xs: "auto 1fr auto", md: "auto 1fr auto" }} gap="200">
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            background: previewBackground,
            border: "1px solid rgba(15, 23, 42, 0.12)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        />

        <TextField
          label={label}
          value={textValue}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          autoComplete="off"
        />

        <div
          style={{
            position: "relative",
            width: "44px",
            minWidth: "44px",
            height: "44px",
            borderRadius: "12px",
            border: "1px solid rgba(15, 23, 42, 0.12)",
            background: currentHex,
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => pickerRef.current?.click()}
        >
          <input
            ref={pickerRef}
            type="color"
            value={currentHex}
            onChange={(event) => handleHexChange(event.target.value)}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </div>
      </InlineGrid>

      <RangeSlider
        label="Opacity"
        value={alphaValue}
        onChange={handleAlphaChange}
        min={0}
        max={100}
        step={1}
        output
      />

      <BlockStack gap="100">
        <Text as="p" variant="bodySm" tone="subdued">
          Quick colors
        </Text>

        <InlineStack gap="150" wrap>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => applyPreset(preset)}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "999px",
                border:
                  preset.toLowerCase() === currentHex.toLowerCase()
                    ? "2px solid #111827"
                    : "1px solid rgba(15, 23, 42, 0.12)",
                background: preset,
                cursor: "pointer",
              }}
              aria-label={`Use color ${preset}`}
              title={preset}
            />
          ))}
        </InlineStack>
      </BlockStack>

      {helpText ? (
        <Box>
          <Text as="p" variant="bodySm" tone="subdued">
            {helpText}
          </Text>
        </Box>
      ) : null}
    </BlockStack>
  );
}