export const logInfoInput = (objectJSON: object): void => {
  if (process.env.STAGE !== "production") {
    console.info("" + JSON.stringify(objectJSON, null, 2));
  }
};

export const logInfoObject = (title: string, objectJSON: object): void => {
  if (process.env.STAGE !== "production") {
    console.info(`${title}\n` + JSON.stringify(objectJSON, null, 2));
  }
};

export const logErrorObject = (title: string, objectJSON: object): void => {
  console.error(`${title}\n` + JSON.stringify(objectJSON, null, 2));
};
