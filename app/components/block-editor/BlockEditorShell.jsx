import { InlineGrid } from "@shopify/polaris";

export function BlockEditorShell({
  header,
  sidebar,
  preview,
  sidebarWidth = "470px",
  minDesktopHeight = 720,
  viewportOffset = 220,
}) {
  return (
    <>
      <style>
        {`
          .lss-block-editor-root {
            min-height: 0;
          }

          .lss-block-editor-header {
            min-height: 0;
          }

          .lss-block-editor-shell {
            min-height: 0;
          }

          .lss-block-editor-layout {
            align-items: start;
          }

          .lss-block-editor-sidebar,
          .lss-block-editor-preview {
            min-width: 0;
            min-height: 0;
          }

          @media screen and (min-width: 1024px) {
            .lss-block-editor-root {
              height: calc(100vh - ${viewportOffset}px);
              min-height: ${minDesktopHeight}px;
              display: flex;
              flex-direction: column;
              overflow: hidden;
            }

            .lss-block-editor-header {
              flex: 0 0 auto;
              padding-bottom: 12px;
            }

            .lss-block-editor-shell {
              flex: 1 1 auto;
              min-height: 0;
              overflow: hidden;
            }

            .lss-block-editor-layout {
              height: 100%;
              align-items: stretch;
            }

            .lss-block-editor-sidebar {
              height: 100%;
              min-height: 0;
              overflow-y: auto;
              overflow-x: hidden;
              padding-right: 10px;
              scrollbar-gutter: stable;
            }

            .lss-block-editor-sidebar::-webkit-scrollbar {
              width: 10px;
            }

            .lss-block-editor-sidebar::-webkit-scrollbar-track {
              background: transparent;
            }

            .lss-block-editor-sidebar::-webkit-scrollbar-thumb {
              background: rgba(145, 158, 171, 0.45);
              border-radius: 999px;
              border: 2px solid transparent;
              background-clip: content-box;
            }

            .lss-block-editor-preview {
              height: 100%;
              min-height: 0;
              overflow: hidden;
            }
          }
        `}
      </style>

      <div className="lss-block-editor-root">
        <div className="lss-block-editor-header">{header}</div>

        <div className="lss-block-editor-shell">
          <InlineGrid
            className="lss-block-editor-layout"
            columns={{ xs: 1, lg: `${sidebarWidth} minmax(0, 1fr)` }}
            gap="300"
          >
            <div className="lss-block-editor-sidebar">{sidebar}</div>
            <div className="lss-block-editor-preview">{preview}</div>
          </InlineGrid>
        </div>
      </div>
    </>
  );
}