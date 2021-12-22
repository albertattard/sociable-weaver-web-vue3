import { createSaveEntry, doAllVariablesHaveValues, Entry, join, SaveEntry, setValue } from "@/models/Chapter";

describe("Entry", () => {
  describe("setValue()", () => {
    it("does not fail if variables are not set", () => {
      /* Given */
      const update = { name: "NAME", value: "Albert" };
      const entry = { values: {} } as Entry;

      /* When */
      setValue(entry, update);

      /* Then */
      expect(entry.values).toEqual({});
    });

    it("does not update the value as the variable is not used", () => {
      /* Given */
      const update = { name: "NAME", value: "Albert" };
      const entry = { variables: ["USERNAME"], values: {} } as Entry;

      /* When */
      setValue(entry, update);

      /* Then */
      expect(entry.values).toEqual({});
    });

    it("set the new variable value", () => {
      /* Given */
      const update = { name: "NAME", value: "Albert" };
      const entry = { variables: ["NAME"], values: {} } as Entry;

      /* When */
      setValue(entry, update);

      /* Then */
      expect(entry.values).toEqual({ NAME: "Albert" });
    });

    it("does not fail if values are not set", () => {
      /* Given */
      const update = { name: "NAME", value: "Albert" };
      const entry = { variables: ["NAME"] } as Entry;

      /* When */
      setValue(entry, update);

      /* Then */
      expect(entry.values).toEqual({ NAME: "Albert" });
    });
  });

  describe("doAllVariablesHaveValues()", () => {
    it("returns true if all variables have a value", () => {
      /* Given */
      const entry = { variables: ["NAME"], values: {} } as Entry;
      /* TODO: How can I inline this? */
      entry.values["NAME"] = "Albert";

      /* When */
      const result = doAllVariablesHaveValues(entry);

      /* Then */
      expect(result).toEqual(true);
    });

    it("returns false when at least one variables dose not have a value", () => {
      /* Given */
      const entry = { variables: ["NAME"], values: {} } as Entry;

      /* When */
      const result = doAllVariablesHaveValues(entry);

      /* Then */
      expect(result).toEqual(false);
    });

    it("does not fail and returns false when variables exists but values are missing", () => {
      /* Given */
      const entry = { variables: ["NAME"] } as Entry;

      /* When */
      const result = doAllVariablesHaveValues(entry);

      /* Then */
      expect(result).toEqual(false);
    });

    it("does not fail and returns true when variables do not exist", () => {
      /* Given */
      const entry = {} as Entry;

      /* When */
      const result = doAllVariablesHaveValues(entry);

      /* Then */
      expect(result).toEqual(true);
    });
  });

  describe("createSaveEntry()", () => {
    it("copies all values", () => {
      /* Given */
      const entry = {
        type: "test-type",
        id: "86e03298-367e-48f9-afa8-2d90438f4d2b",
        name: "copy all values",
        workingDirectory: "working-directory",
        parameters: ["param-1", "param-2"],
        variables: ["var-1", "var-2"],
        environmentVariables: ["env-1", "env-2"],
        values: {},
        ignoreErrors: true,
        pushChanges: true,
        dryRun: true,
        sensitive: true,
        expectedExitValue: 1,
        commandTimeout: 600,
      } as Entry;
      /* TODO: How can I inline these? */
      entry.values["NAME"] = "Albert";
      entry.values["SURNAME"] = "Attard";

      /* When */
      const result = createSaveEntry(entry);

      /* Then */
      const expected = {
        type: "test-type",
        id: "86e03298-367e-48f9-afa8-2d90438f4d2b",
        name: "copy all values",
        workingDirectory: "working-directory",
        parameters: ["param-1", "param-2"],
        variables: ["var-1", "var-2"],
        environmentVariables: ["env-1", "env-2"],
        values: {},
        ignoreErrors: true,
        pushChanges: true,
        dryRun: true,
        sensitive: true,
        expectedExitValue: 1,
        commandTimeout: 600,
      } as SaveEntry;
      /* TODO: How can I inline these? */
      expected.values["NAME"] = "Albert";
      expected.values["SURNAME"] = "Attard";
      expect(result).toEqual(expected);
    });
  });

  describe("join()", () => {
    it("returns an empty string when given a null array", () => {
      /* Given */
      const entry = {} as Entry;

      /* When */
      const result = join(entry.parameters);

      /* Then */
      expect(result).toEqual("");
    });

    it("returns the default value when given a null array", () => {
      /* Given */
      const entry = {} as Entry;

      /* When */
      const result = join(entry.parameters, () => "Default value");

      /* Then */
      expect(result).toEqual("Default value");
    });
  });
});
