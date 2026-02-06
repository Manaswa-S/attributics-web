
import AkasaAirLogo from "../../assets/brands/akasaair.svg?react";
import AmericanaLogo from "../../assets/brands/americana.svg?react";
import ApparelGroupLogo from "../../assets/brands/apparelgroup.svg?react";
import AWSLogo from "../../assets/brands/aws.svg?react";
import AzureLogo from "../../assets/brands/azure.svg?react";
import CasetifyLogo from "../../assets/brands/casetify.svg?react";
import ClevertapLogo from "../../assets/brands/clevertap.svg?react";
import ClubMahindraLogo from "../../assets/brands/clubmahindra.svg?react";
import DatabricksLogo from "../../assets/brands/databricks.svg?react";
import GynovedaLogo from "../../assets/brands/gynoveda.svg?react";
import HBOMaxLogo from "../../assets/brands/hbomax.svg?react";
import JockeyLogo from "../../assets/brands/jockey.svg?react";
import KFCLogo from "../../assets/brands/kfc.svg?react";
import LevisLogo from "../../assets/brands/levis.svg?react";
import PhitureLogo from "../../assets/brands/phiture.svg?react";
import PizzaHutLogo from "../../assets/brands/pizzahut.svg?react";
import PowerBiLogo from "../../assets/brands/powerbi.svg?react";
import TableauLogo from "../../assets/brands/tableau.svg?react";
import UnicefLogo from "../../assets/brands/unicef.svg?react";


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