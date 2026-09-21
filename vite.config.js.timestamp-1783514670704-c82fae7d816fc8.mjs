// vite.config.js
import { defineConfig } from "file:///R:/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E9%96%8B%E7%99%BA/%E9%96%8B%E7%99%BA%E3%83%87%E3%83%BC%E3%82%BF/fitlog-ai/node_modules/vite/dist/node/index.js";
import react from "file:///R:/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E9%96%8B%E7%99%BA/%E9%96%8B%E7%99%BA%E3%83%87%E3%83%BC%E3%82%BF/fitlog-ai/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: false,
    watch: {
      usePolling: true,
      interval: 100
    },
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("chart.js") || id.includes("react-chartjs-2")) {
              return "vendor-chart";
            }
            if (id.includes("firebase")) {
              return "vendor-firebase";
            }
            if (id.includes("exceljs") || id.includes("docx") || id.includes("xlsx")) {
              return "vendor-export";
            }
            return "vendor";
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJSOlxcXFxcdTMwRDdcdTMwRURcdTMwQjBcdTMwRTlcdTMwREZcdTMwRjNcdTMwQjBcdTk1OEJcdTc2N0FcXFxcXHU5NThCXHU3NjdBXHUzMEM3XHUzMEZDXHUzMEJGXFxcXGZpdGxvZy1haVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiUjpcXFxcXHUzMEQ3XHUzMEVEXHUzMEIwXHUzMEU5XHUzMERGXHUzMEYzXHUzMEIwXHU5NThCXHU3NjdBXFxcXFx1OTU4Qlx1NzY3QVx1MzBDN1x1MzBGQ1x1MzBCRlxcXFxmaXRsb2ctYWlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1I6LyVFMyU4MyU5NyVFMyU4MyVBRCVFMyU4MiVCMCVFMyU4MyVBOSVFMyU4MyU5RiVFMyU4MyVCMyVFMyU4MiVCMCVFOSU5NiU4QiVFNyU5OSVCQS8lRTklOTYlOEIlRTclOTklQkElRTMlODMlODclRTMlODMlQkMlRTMlODIlQkYvZml0bG9nLWFpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA1MTczLFxyXG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXHJcbiAgICAgIGludGVydmFsOiAxMDAsXHJcbiAgICB9LFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo1MTc0XCIsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0XCIpIHx8IGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yLXJlYWN0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiY2hhcnQuanNcIikgfHwgaWQuaW5jbHVkZXMoXCJyZWFjdC1jaGFydGpzLTJcIikpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItY2hhcnRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJmaXJlYmFzZVwiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvci1maXJlYmFzZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImV4Y2VsanNcIikgfHwgaWQuaW5jbHVkZXMoXCJkb2N4XCIpIHx8IGlkLmluY2x1ZGVzKFwieGxzeFwiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvci1leHBvcnRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4WCxTQUFTLG9CQUFvQjtBQUMzWixPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLGdCQUFJLEdBQUcsU0FBUyxPQUFPLEtBQUssR0FBRyxTQUFTLFdBQVcsR0FBRztBQUNwRCxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsVUFBVSxLQUFLLEdBQUcsU0FBUyxpQkFBaUIsR0FBRztBQUM3RCxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQzNCLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxTQUFTLEtBQUssR0FBRyxTQUFTLE1BQU0sS0FBSyxHQUFHLFNBQVMsTUFBTSxHQUFHO0FBQ3hFLHFCQUFPO0FBQUEsWUFDVDtBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
