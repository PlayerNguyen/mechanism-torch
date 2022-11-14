import { getProfileFilePath } from "../utils/File";
import { JsonInterceptor, JsonSerializable } from "./Interceptor";

interface LauncherProfileNode {
  name: string;
  version: string;
}

export class LauncherProfile extends JsonSerializable<LauncherProfile> {
  public profiles: LauncherProfileNode[] = [];
  /**
   * Construct a new
   * @param profiles a list of profile to load, can be empty
   */
  constructor(profiles?: LauncherProfileNode[]) {
    super();
    this.profiles = !profiles ? [] : profiles;
  }

  addProfile(profile: LauncherProfileNode) {
    this.profiles = [...this.profiles, profile];
  }

  removeProfile(
    index: number
  ) {
    this.profiles = this.profiles.filter((_predicate, _index) => _index !== index);
  }

  async loadDefault(latestVersion: string) {
    console.log(`Initializing default launcher profile`);
    // Check version manifest for the latest
    this.profiles = [
      {
        name: "Latest",
        version: latestVersion,
      },
    ];

    // await ProfileInterceptor.write(this);
    new ProfileInterceptor().write(this, getProfileFilePath());
  }

  async load() {
    console.log(`Loading from configured Profile.json file`);

    const profile = await ProfileInterceptor.getInstance().read(
      getProfileFilePath()
    );

    this.profiles = profile.profiles;
  }

  serialize(obj: LauncherProfile): string {
    return JSON.stringify(obj.profiles);
  }

  deserialize(string: string): LauncherProfile {
    return new LauncherProfile(JSON.parse(string));
  }

  static profileInstance: LauncherProfile;

  static getInstance(): LauncherProfile {
    if (this.profileInstance === undefined || this.profileInstance === null)
      this.profileInstance = new LauncherProfile();

    return this.profileInstance;
  }
}

class ProfileInterceptor extends JsonInterceptor<LauncherProfile> {
  private static instance: ProfileInterceptor = new ProfileInterceptor();
  public static getInstance() {
    return this.instance;
  }
}
