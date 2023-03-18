function myFunction() {
  const formTitle = "QuestionNihongo"; // This is a form title.
  const sheetName = "Sheet1"; // This is a sheet name.

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const [, ...values] = sheet
    .getDataRange()
    .getDisplayValues()
    .filter((r) => r.join("") != "");
  const obj = values.map(([a, b, c]) => {
    const answers = b
      .split("\n")
      .map((e) => e.trim())
      .filter(String);
    const correct = c
      .split("\n")
      .map((e) => e.trim())
      .filter(String);
    return {
      question: a,
      answers,
      correct,
      point: 1,
      type: correct.length == 1 ? "addMultipleChoiceItem" : "addCheckboxItem",
    };
  });
  const form = FormApp.create(formTitle)
    .setIsQuiz(true)
    .setTitle("Sample questions")
    .setProgressBar(true)
    .setCollectEmail(true)
    .setPoints(10)
    .set
  obj.forEach(({ question, answers, correct, point, type }) => {
    const choice = form[type]();
    const choices = answers.map((e) =>
      choice.createChoice(e, correct.includes(e) ? true : false)
    );
    choice.setTitle(question).setPoints(point).setChoices(choices);
  });
}
