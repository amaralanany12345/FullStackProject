using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using StoreDataBase.AppContexts;
using StoreDomain.Enums;
using StoreDomain.Models;
using StoreService.DTO;
using StoreService.Interfaces;
using StoreService.ResponseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreWebApi.ServiceModel

{
    public class ItemUpdatedNotifyService : IItemUpdatedNotifyService
    {
        private readonly IHubContext<UpdatingHub> _hubContext;
        public ItemUpdatedNotifyService(IHubContext<UpdatingHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifyItemUpdating(Item item)
        {
            await _hubContext.Clients.All.SendAsync("itemUpdated",item);
        }
    }
}
