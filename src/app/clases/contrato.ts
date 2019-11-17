export class Contrato{
    id: number;
    banco_id: number;
    factura_id: number;
    fecha_giro: Date;
    fecha_vencimiento: Date;
    valor_nominal: number;
    dias: number;
    retencion: number;
    tasa_efectiva: number;
    porcentaje_descuento: number;
    descuento: number;
    costos_iniciales: number;
    costos_finales: number;
    valor_neto: number;
    valor_recibido: number;
    valor_entregado: number;
    tcea: number;
}