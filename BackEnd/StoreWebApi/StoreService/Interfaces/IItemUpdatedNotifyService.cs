using StoreDomain.Models;
using StoreService.DTO;
using StoreService.ResponseModel;

namespace StoreService.Interfaces
{
    public interface IItemUpdatedNotifyService
    {
        Task NotifyItemUpdating(Item item);
    }
}
