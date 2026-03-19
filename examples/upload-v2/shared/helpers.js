export async function getFile(path) {
  const res = await fetch(path);
  const blob = await res.blob();
  return new File([blob], 'file.pdf', { type: 'application/pdf' });
}
