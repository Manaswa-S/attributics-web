
import AkasaAirLogo from "../../../assets/brands/akasaair.svg";
import AmericanaLogo from "../../../assets/brands/americana.svg";
import ApparelGroupLogo from "../../../assets/brands/apparelgroup.svg";
import AWSLogo from "../../../assets/brands/aws.svg";
import AzureLogo from "../../../assets/brands/azure.svg";
import CasetifyLogo from "../../../assets/brands/casetify.svg";
import ClevertapLogo from "../../../assets/brands/clevertap.svg";
import ClubMahindraLogo from "../../../assets/brands/clubmahindra.svg";
import DatabricksLogo from "../../../assets/brands/databricks.svg";
import GynovedaLogo from "../../../assets/brands/gynoveda.svg";
import HBOMaxLogo from "../../../assets/brands/hbomax.svg";
import JockeyLogo from "../../../assets/brands/jockey.svg";
import KFCLogo from "../../../assets/brands/kfc.svg";
import LevisLogo from "../../../assets/brands/levis.svg";
import PhitureLogo from "../../../assets/brands/phiture.svg";
import PizzaHutLogo from "../../../assets/brands/pizzahut.svg";
import PowerBiLogo from "../../../assets/brands/powerbi.svg";
import TableauLogo from "../../../assets/brands/tableau.svg";
import UnicefLogo from "../../../assets/brands/unicef.svg";


export const logoMap = {
    akasaair: AkasaAirLogo,
    americana: AmericanaLogo,
    apparelgroup: ApparelGroupLogo,
    aws: AWSLogo,
    azure: AzureLogo,
    casetify: CasetifyLogo,
    clevertap: ClevertapLogo,
    clubmahindra: ClubMahindraLogo,
    databricks: DatabricksLogo,
    gynoveda: GynovedaLogo,
    hbomax: HBOMaxLogo,
    jockey: JockeyLogo,
    kfc: KFCLogo,
    levis: LevisLogo,
    phiture: PhitureLogo,
    pizzahut: PizzaHutLogo,
    powerbi: PowerBiLogo,
    tableau: TableauLogo,
    unicef: UnicefLogo
};

// Tools to change to proper svg format.
// for img in *.png; do   inkscape "$img" --export-type=svg --export-filename="${img%.png}.svg"; done
// npx svgo *.svg