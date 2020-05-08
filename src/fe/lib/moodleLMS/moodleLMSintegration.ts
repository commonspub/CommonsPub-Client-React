export interface MoodleLMSParams {
  site: string;
  course?: string;
  section?: string;
}

export const getUrlParamsFromEntryPointForMoodleLMS = (): MoodleLMSParams | null => {
  const q = new URLSearchParams(location.search);
  const site = q.get('site');
  if (!site) {
    return null;
  }
  const course = q.get('course') || void 0;
  const section = q.get('section') || void 0;
  return {
    site,
    course,
    section
  };
};

export const sendToMoodle = (
  resourceurl: string,
  { site, course, section }: MoodleLMSParams
) => {
  const form = document.createElement('form');
  form.target = '_blank';
  form.method = 'POST';
  form.action = `${site}/admin/tool/moodlenet/import.php`;
  form.style.display = 'none';
  const params = {
    resourceurl,
    course,
    section
  };
  Object.entries(params).forEach(([name, val]) => {
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = name;
    hiddenField.value = val || '';
    form.appendChild(hiddenField);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
