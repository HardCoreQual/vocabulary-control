const downloadBlob = (blob: Blob, name: string) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  link.click();
};

export const downloadObjectAsJson = (data: any, name: string) => {
  const json = JSON.stringify(data);
  const blob = new Blob([new Buffer(json)], {
    type: 'application/json'
  });

  downloadBlob(blob, name + '.json');
};