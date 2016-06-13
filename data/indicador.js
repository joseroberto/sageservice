const dao = require('../dao/dao'),
    _ = require('underscore');

var indicadores = [
  {
    "co_indicador_principal": -2,
    "co_indicador": "ESB01",
    "ds_indicador": "Número de equipes de saude bucal",
    "sql": "SELECT ano_esb as ano, mes_esb as mes, Sum(tb_esb.nu_esb) AS valor FROM dbacoes_saude.tb_esb GROUP BY tb_esb.ano_esb, tb_esb.mes_esb "
  },
  {
    "co_indicador_principal": -1,
    "co_indicador": "PSF01",
    "ds_indicador": "Número de equipes de saúde da família nos mucipios",
    "sql": "SELECT ano_psf as ano, mes_psf as mes, Sum(psf_implantados) AS valor FROM dbacoes_saude.tb_psf GROUP BY ano_psf, mes_psf "
  },
  {
    "co_indicador_principal": -3,
    "co_indicador": "CEO01",
    "ds_indicador": "Número de centros de especialidade odontológica",
    "sql": "select ano_ref as ano, mes_ref as mes, count(distinct co_cnes) as valor FROM dbacoes_saude.tb_vsl_ceo_qualif group by ano_ref, mes_ref "
  },
  {
    "co_indicador_principal": -4,
    "co_indicador": "EAD01",
    "ds_indicador": "Número de equipes de atenção domiciliar",
    "sql": "select ano_mc as ano, mes_mc as mes, sum(nu_emad_implant_mc + nu_emap_implant_mc) as valor from dbacoes_saude.tb_melhor_casa group by ano_mc, mes_mc "
  },
  {
    "co_indicador_principal": -5,
    "co_indicador": "EMAD1",
    "ds_indicador": "Número de equipes EMAD",
    "sql": "select ano_mc as ano, mes_mc as mes, sum(nu_emad_implant_mc) as valor from dbacoes_saude.tb_melhor_casa group by ano_mc, mes_mc "
  },
  {
    "co_indicador_principal": -6,
    "co_indicador": "EMAP1",
    "ds_indicador": "Número de equipes EMAP",
    "sql": "select ano_mc as ano, mes_mc as mes, sum(nu_emap_implant_mc) as valor from dbacoes_saude.tb_melhor_casa group by ano_mc, mes_mc "
  },
  {
    "co_indicador_principal": -7,
    "co_indicador": "NMA1",
    "ds_indicador": "Número de mamografias bilaterais em mulheres de 50-69 anos",
    "sql": "SELECT ano, mes, Sum(CASE WHEN qt_mama_50_69 > 0 THEN qt_mama_50_69 ELSE 0 END) AS valor FROM dbaih.tb_bpi_cancer_mama_consolidado_ano_mes GROUP BY ano, mes "
  },
  {
    "co_indicador_principal": -8,
    "co_indicador": "NEC1",
    "ds_indicador": "Número de exames citopatológicos para rastreamento de câncer de colo de útero em mulheres de 25 a 64 anos",
    "sql": "SELECT ano, mes, Sum(CASE WHEN qt_colo_25_64 > 0 THEN qt_colo_25_64 ELSE 0 END) AS qt_colo FROM dbaih.tb_bpi_cancer_mama_consolidado_ano_mes GROUP BY ano, mes "
  },
  {
    "co_indicador_principal": -10,
    "co_indicador": "NC3AD",
    "ds_indicador": "Número de CAPS III - 24 horas",
    "sql": "SELECT caps.ano_caps_det as ano,caps.mes_caps_det as mes,sum(caps.qtde) as valor FROM dbacoes_saude.tb_caps_det AS caps where caps.tp_caps = 'CAPS AD III' GROUP BY caps.ano_caps_det,caps.mes_caps_det "
  },
  {
    "co_indicador_principal": -11,
    "co_indicador": "CER01",
    "ds_indicador": "Número de CER em funcionamento",
    "sql": "select ano_ref as ano, mes_ref as mes, count(distinct co_cnes) as valor FROM dbacoes_saude.tb_vsl_reabilit group by ano_ref, mes_ref "
  },
  {
    "co_indicador_principal": -12,
    "co_indicador": "NOO01",
    "ds_indicador": "Número de oficinas ortopédicas em funcionamento",
    "sql": "select ano_ref as ano, mes_ref as mes, count(distinct co_cnes) as valor FROM dbacoes_saude.tb_vsl_ofic_ortop where co_cnes is not null group by ano_ref, mes_ref "
  },
  {
    "co_indicador_principal": -13,
    "co_indicador": "NCAD01",
    "ds_indicador": "Número de CAPS-AD e AD III implantados",
    "sql": "select ano_caps_det as ano, mes_caps_det as mes, sum(qtde) as valor from (select distinct co_ibge, ano_caps_det, mes_caps_det, tp_caps, qtde FROM dbacoes_saude.tb_caps_det where qtde > 0 and tp_caps in ('CAPS AD III','CAPS AD') ) as a group by ano_caps_det, mes_caps_det "
  },
  {
    "co_indicador_principal": -14,
    "co_indicador": "NVAD01",
    "ds_indicador": "Número de veículos adaptados acessíveis para transporte de pessoas com deficiência",
    "sql": "select ano_ref as ano, mes_ref as mes, sum(nu_veic_receb) as valor from dbacoes_saude.tb_vsl_veic_adap group by ano_ref, mes_ref "
  },
  {
    "co_indicador_principal": -15,
    "co_indicador": "NMTA01",
    "ds_indicador": "Número de maternidades equipadas com triagem auditiva neonatal pelo programa viver sem limite",
    "sql": "select ano_ref as ano, mes_ref as mes, count(*) as valor from dbacoes_saude.tb_vsl_matern_qualif group by ano_ref, mes_ref "
  },
  {
    "co_indicador_principal": -16,
    "co_indicador": "NLRPD",
    "ds_indicador": "Número de laboratórios regionais de próteses dentárias",
    "sql": "select ano_protese_dent as ano, mes_protese_dent as mes, sum(nu_laborat_dent) as valor from dbacoes_saude.tb_ceo_protese_dent group by ano_protese_dent, mes_protese_dent "
  },
  {
    "co_indicador_principal": -17,
    "co_indicador": "NSRT",
    "ds_indicador": "Número de serviços SRT",
    "sql": "select ano_ref as ano, mes_ref as mes, sum(nu_srt) as valor from dbacoes_saude.tb_srt group by ano_ref, mes_ref "
  },
  {
    "co_indicador_principal": -18,
    "co_indicador": "NLSM",
    "ds_indicador": "Número de leitos de saúde mental em hospitais gerais",
    "sql": "select ano_atualizacao as ano, mes_atualizacao as mes, sum(qtd) as valor from dbacoes_saude.tb_crack_servicos where nu_tipo='2' group by ano_atualizacao, mes_atualizacao "
  },
  {
    "co_indicador_principal": -19,
    "co_indicador": "NUAA",
    "ds_indicador": "Número de unidades de acolhimento adulto",
    "sql": "select ano_atualizacao as ano, mes_atualizacao as mes, sum(qtd) as valor from dbacoes_saude.tb_crack_servicos where nu_tipo in ('3','6') group by ano_atualizacao, mes_atualizacao "
  },
  {
    "co_indicador_principal": -20,
    "co_indicador": "NECR",
    "ds_indicador": "Número de equipes de consultório de rua",
    "sql": "select ano, mes, sum(qtd) as valor from (select ano_cnar as ano, mes_cnar as mes, sum(nu_ecr_cnar) as qtd from dbacoes_saude.tb_cnar group by ano_cnar, mes_cnar union  select ano_cder as ano, mes_cder as mes, sum(nu_ecr_cder) as qtd from dbacoes_saude.tb_cder group by ano_cder, mes_cder ) as a group by ano, mes "
  },
  {
    "co_indicador_principal": -21,
    "co_indicador": "NNASF",
    "ds_indicador": "Número de equipes de NASF",
    "sql": "select ano_nasf as ano, mes_nasf as mes, sum(coalesce(nu_nasf1,0) + coalesce(nu_nasf2,0) + coalesce(nu_nasf3,0)) as valor from dbacoes_saude.tb_nasf group by ano_nasf, mes_nasf "
  },
  {
    "co_indicador_principal": -22,
    "co_indicador": "NUAI",
    "ds_indicador": "Número de UAI",
    "sql": "select ano_atualizacao as ano, mes_atualizacao as mes, sum(qtd) as valor from dbacoes_saude.tb_crack_servicos  where nu_tipo in ('4','7') group by ano_atualizacao, mes_atualizacao "
  },
  {
    "co_indicador_principal": -9,
    "co_indicador": "NCAP",
    "ds_indicador": "Número de CAPS",
    "sql": "SELECT caps.ano_caps_det as ano,caps.mes_caps_det as mes,sum(caps.qtde) as valor FROM dbacoes_saude.tb_caps_det AS caps GROUP BY caps.ano_caps_det,caps.mes_caps_det "
  }
];
var flagAcabou = false;

dao.execute(function(err, result){
    if(err){
        console.log(err);
        return;
    }
    console.log(result.rows);
    indicadores.forEach((item)=>{
        if(_.contains(result.rows, {codigo: item.co_indicador_principal})){
            console.log('Banco contem ' + item.co_indicador_principal)
        }
        console.log(item.co_indicador)
    });
    flagAcabou=true;

}, dao.conSage, "select co_indicador_principal as codigo from dbpainel.tb_indicador");

(function wait () {
   if (!flagAcabou) setTimeout(wait, 5000);
})();