const fetchAllRecords = async (url, records = [], offset = 0) => {
  const response = await fetch(`${url}&offset=${offset}`);
  const data = await response.json();

  records.push(...data.result.records);

  if (data.result.total > records.length) {
    const nextOffset = offset + 100;
    return await fetchAllRecords(url, records, nextOffset);
  }

  return records;
};

export { fetchAllRecords };
