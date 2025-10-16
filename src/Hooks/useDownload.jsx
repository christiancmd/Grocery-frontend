export function useDownload() {
  return async function triggerDownload(fetcher, filename, mimeType) {
    try {
      const res = await fetcher();
      const blob = new Blob([res.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };
}
