export default function languageProcesser(rawData) {
  return rawData.map((language, index) => ({
    key: index + 1,
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'>
        {language}
      </a>
    ),
  }));
}
