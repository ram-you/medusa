import { EntityManager } from "typeorm"
import { ReturnReasonService } from "../../../../services"

/**
 * @oas [delete] /return-reasons/{id}
 * operationId: "DeleteReturnReason"
 * summary: "Delete a return reason"
 * description: "Deletes a return reason."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the return reason
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in
 *       medusa.admin.returnReasons.delete(return_reason_id)
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request DELETE 'localhost:9000/admin/return-reasons/{id}' \
 *       --header 'Authorization: Bearer {api_token}'
 * tags:
 *   - Return Reason
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the deleted return reason
 *             object:
 *               type: string
 *               description: The type of the object that was deleted.
 *               default: return_reason
 *             deleted:
 *               type: boolean
 *               description: Whether or not the items were deleted.
 *               default: true
 */
export default async (req, res) => {
  const { id } = req.params

  const returnReasonService: ReturnReasonService = req.scope.resolve(
    "returnReasonService"
  )
  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await returnReasonService
      .withTransaction(transactionManager)
      .delete(id)
  })

  res.json({
    id: id,
    object: "return_reason",
    deleted: true,
  })
}
