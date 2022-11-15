import fs from "fs";
import { expect } from "chai";
import { LauncherProfile } from "../../src/electron/assets/Profile";
import { getProfileFilePath } from "../../src/electron/utils/File";
/**
 * A default assertion for profile property
 * @param profile a profile to assert
 */
const assertProfileProperty = (profile: LauncherProfile) => {
  expect(profile).not.to.be.undefined;
  expect(profile.profiles).not.to.be.undefined;
};

describe("Profile class", () => {
  before(async () => {
    try {
      // Load and initialize the Profile.json file before executing
      await LauncherProfile.getInstance().loadDefault("1");
      /**
       * Check if the file are created and
       * contains the default profile
       */
      expect(fs.existsSync(getProfileFilePath())).to.be.true;
      // console.log(fs.readFileSync(getProfileFilePath(), "utf-8"));

      console.log(fs.readFileSync(getProfileFilePath(), "utf-8"));
      // expect(_defaultObject).to.deep.eq({ name: "Latest", version: "1" });
    } catch (err) {
      console.error(err);
    }
  });

  it(`construct with null profile`, () => {
    let profile = new LauncherProfile();
    assertProfileProperty(profile);
    expect(profile.profiles).lengthOf(0);
  });

  it(`construct with a profile`, () => {
    let profile = new LauncherProfile([{ name: "Default", version: "1.1" }]);
    assertProfileProperty(profile);
    expect(profile.profiles).lengthOf.gt(0);
    expect(profile.profiles[0]).to.deep.eq({ name: "Default", version: "1.1" });
  });

  it(`add / remove profile function`, () => {
    let profile = new LauncherProfile([{ name: "Default", version: "1.1" }]);
    profile.addProfile({ name: "Older", version: "1.12.1" });
    assertProfileProperty(profile);
    expect(profile.profiles).lengthOf.gt(0);
    expect(profile.profiles[0]).to.deep.eq({ name: "Default", version: "1.1" });
    expect(profile.profiles[1]).to.deep.eq({
      name: "Older",
      version: "1.12.1",
    });

    profile.removeProfile(0);
    expect(profile.profiles).lengthOf(1);
    expect(profile.profiles[0]).to.deep.eq({
      name: "Older",
      version: "1.12.1",
    });
  });

  it(`load from file profile function`, (done) => {
    // Set up the file

    // new LauncherProfile().load();

    done();
  });

  it(`static serve instance`, () => {
    const launcherInstance = LauncherProfile.getInstance();
    launcherInstance.addProfile({ name: "Default", version: "1" });

    expect(LauncherProfile.getInstance().profiles[0]).to.deep.eq({
      name: "Latest",
      version: "1",
    });

    expect(LauncherProfile.getInstance().profiles[1]).to.deep.eq({
      name: "Default",
      version: "1",
    });

    // Remove test for static serve
    LauncherProfile.getInstance().removeProfile(0);
    expect(LauncherProfile.getInstance().profiles).lengthOf(1);
  });
});
