import { InlineGrid } from "@shopify/polaris";

export function BlockEditorShell({
  header,
  sidebar,
  preview,
  sidebarWidth = "470px",
}) {
  return (
    <>
      <style>
        {`
          .lss-block-editor-root,
          .lss-block-editor-header,
          .lss-block-editor-shell,
          .lss-block-editor-layout,
          .lss-block-editor-sidebar,
          .lss-block-editor-preview {
            min-width: 0;
            min-height: 0;
          }

          .lss-block-editor-layout {
            align-items: start;
          }

          @media screen and (min-width: 1024px) {
            .lss-block-editor-preview {
              position: sticky;
              top: 16px;
              align-self: start;
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